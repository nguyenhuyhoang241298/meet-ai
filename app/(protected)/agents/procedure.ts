import db from '@/db'
import { agents } from '@/db/schema'
import { createTRPCRouter, protectedProcedure } from '@/trpc/init'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { agentInsertSchema } from './schema'

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

  getMany: protectedProcedure.query(async () => {
    return await db.select().from(agents)
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
})
