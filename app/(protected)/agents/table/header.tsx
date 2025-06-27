'use client'

import { CircleX, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DEFAULT_PAGE } from '@/lib/constants'
import { debounce } from 'lodash'
import { useMemo, useState } from 'react'
import { useAgentsFilter } from '../hooks'

const SearchAgents = () => {
  const [filter, setFilter] = useAgentsFilter()
  const [search, setSearch] = useState('')
  const hasSearch = !!filter.search

  const clearSearch = () => {
    setFilter({ search: '', page: DEFAULT_PAGE })
  }

  const debouncedSetFilter = useMemo(
    () => debounce((value: string) => setFilter({ search: value }), 300),
    [setFilter],
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearch(value)
    debouncedSetFilter(value)
  }

  return (
    <div className="flex items-center py-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            placeholder="Filter agents..."
            value={search}
            onChange={handleSearchChange}
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
    </div>
  )
}

export default SearchAgents
