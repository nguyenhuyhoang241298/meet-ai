'use client'

import { Table } from '@tanstack/react-table'
import { ChevronDown, CircleX, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { DEFAULT_PAGE } from '@/lib/constants'
import { useAgentsFilter } from '../hooks'
import { AgentGetOne } from '../type'

const Header = ({ table }: { table: Table<AgentGetOne> }) => {
  const [filter, setFilter] = useAgentsFilter()
  const hasSearch = !!filter.search

  const clearSearch = () => {
    setFilter({ search: '', page: DEFAULT_PAGE })
  }

  return (
    <div className="flex items-center py-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            placeholder="Filter agents..."
            value={filter.search}
            onChange={(event) => setFilter({ search: event.target.value })}
            className="max-w-sm pl-8"
          />
          <Search className="absolute size-4 left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
        </div>
        {hasSearch && (
          <Button onClick={clearSearch} variant={'outline'}>
            <CircleX className="size-4 mr-2" /> Clear
          </Button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Header
