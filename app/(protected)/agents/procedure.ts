import db from '@/db'
import { agents } from '@/db/schema'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/lib/constants'
import { createTRPCRouter, protectedProcedure } from '@/trpc/init'
import { and, count, desc, eq, ilike } from 'drizzle-orm'
import { z } from 'zod'
import { agentInsertSchema, agentUpdateSchema } from './schema'

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [agent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id))

      return agent
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, search } = input
      const items = await db
        .select()
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined,
          ),
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined,
          ),
        )

      const totalPages = Math.ceil(total.count / pageSize)

      return {
        items,
        total: total.count,
        page,
        pageSize,
        totalPages,
      }
    }),

  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [newAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning()

      return newAgent
    }),

  update: protectedProcedure
    .input(agentUpdateSchema)
    .mutation(async ({ input }) => {
      const [editAgent] = await db
        .update(agents)
        .set({
          name: input.name,
          instructions: input.instructions,
          updatedAt: new Date(),
        })
        .where(eq(agents.id, input.id))
        .returning()

      return editAgent
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const [deletedAgent] = await db
        .delete(agents)
        .where(eq(agents.id, input.id))
        .returning()

      return deletedAgent
    }),
})
