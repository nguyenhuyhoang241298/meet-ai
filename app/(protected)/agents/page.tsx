'use client'

import ErrorState from '@/components/ui/error-state'
import LoadingState from '@/components/ui/loading-state'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

const Page = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return <div>{JSON.stringify(data, null, 2)}</div>
}

export const AgentLoading = () => (
  <LoadingState
    title="Loading Agents"
    description="Please wait while we load your agents."
  />
)

export const AgentError = () => (
  <ErrorState
    title="Error Loading Agents"
    description="Please try again later."
  />
)

export default Page
