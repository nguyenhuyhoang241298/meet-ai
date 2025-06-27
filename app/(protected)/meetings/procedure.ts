import db from '@/db'
import { meetings } from '@/db/schema'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/lib/constants'
import { createTRPCRouter, protectedProcedure } from '@/trpc/init'
import { and, count, desc, eq, ilike } from 'drizzle-orm'
import { z } from 'zod'

export const meetingsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [meeting] = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, input.id))

      return meeting
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
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
          ),
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
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
})
