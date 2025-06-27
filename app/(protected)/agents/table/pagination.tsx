import { Button } from '@/components/ui/button'
import { DEFAULT_PAGE } from '@/lib/constants'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useAgentsFilter } from '../hooks'

const Pagination = () => {
  const [filter, setFilter] = useAgentsFilter()
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filter,
    }),
  )

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        Total: {data.total}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilter({ page: filter.page - 1 })}
          disabled={data.page === DEFAULT_PAGE}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilter({ page: filter.page + 1 })}
          disabled={data.page >= data.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
