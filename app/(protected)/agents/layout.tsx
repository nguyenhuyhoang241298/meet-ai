import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { AgentError, AgentLoading } from './actions-state'
import ListHeader from './list-header'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <div className="p-6 space-y-6">
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentLoading />}>
          <ErrorBoundary fallback={<AgentError />}>{children}</ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default Layout
