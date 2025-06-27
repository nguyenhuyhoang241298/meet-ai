import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { AgentError, AgentLoading } from './actions-state'
import { loadSearchParams } from './params'
import TableContainer from './table/table-container'

interface PageProps {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: PageProps) => {
  const queryClient = getQueryClient()
  const filter = await loadSearchParams(searchParams)

  queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filter,
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentLoading />}>
        <ErrorBoundary fallback={<AgentError />}>
          <TableContainer />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
