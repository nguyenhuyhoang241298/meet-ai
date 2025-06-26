import { agentsRouter } from '@/app/(protected)/agents/procedure'
import { createTRPCRouter } from '../init'

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
})

export type AppRouter = typeof appRouter
