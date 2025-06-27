import { agentsRouter } from '@/app/(protected)/agents/procedure'
import { meetingsRouter } from '@/app/(protected)/meetings/procedure'
import { createTRPCRouter } from '../init'

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
})

export type AppRouter = typeof appRouter
