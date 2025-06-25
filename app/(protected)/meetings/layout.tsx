import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text: 'Hoàng',
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
