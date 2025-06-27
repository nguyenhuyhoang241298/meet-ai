'use client'

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useAgentsFilter } from '../hooks'
import { DataTable } from './table'

const TableContainer = () => {
  const [filter] = useAgentsFilter()
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filter,
    }),
  )

  return <DataTable data={data.items} />
}

export default TableContainer
