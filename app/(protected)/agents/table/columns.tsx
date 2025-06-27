import { ColumnDef, Row } from '@tanstack/react-table'
import { Edit, Trash, Video } from 'lucide-react'

import { Button } from '@/components/ui/button'
import GeneratedAvatar from '@/components/ui/generated-avatar'
import { format } from 'date-fns'
import useAgentsStore from '../store'
import { AgentGetOne } from '../type'

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: 'name',
    header: 'Agent',
    cell: ({ row }) => (
      <div className="flex py-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <GeneratedAvatar
            seed={row.getValue('name')}
            className="size-10 border"
            variant="botttsNeutral"
          />
          <div className="flex flex-col justify-center ">
            <p className="font-semibold">{row.getValue('name')}</p>
            <p className="font-medium text-zinc-500">
              {row.original.instructions}
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    accessorKey: 'meeting',
    header: () => <div>Meetings</div>,
    cell: () => {
      return (
        <div className="font-medium flex gap-2 items-center">
          <Video className="size-4 text-green-500" /> <span>5 meetings</span>
        </div>
      )
    },
  },

  {
    accessorKey: 'createdAt',
    header: () => <div>Created At</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue('createdAt'))
      return <p>{format(createdAt, 'dd/MM/yyyy HH:mm')}</p>
    },
  },

  {
    accessorKey: 'updatedAt',
    header: () => <div>Updated At</div>,
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue('updatedAt'))
      return <p>{format(updatedAt, 'dd/MM/yyyy HH:mm')}</p>
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionCell row={row} />
    },
  },
]

const ActionCell = ({ row }: { row: Row<AgentGetOne> }) => {
  return (
    <div className="flex items-center gap-3">
      <EditButton row={row} />
      <DeleteButton row={row} />
    </div>
  )
}

const EditButton = ({ row }: { row: Row<AgentGetOne> }) => {
  const { setOpenUpdateDialog, setCurrentAgent } = useAgentsStore()

  const onUpdate = () => {
    setCurrentAgent(row.original)
    setOpenUpdateDialog(true)
  }

  return (
    <Button size={'icon'} variant={'ghost'} onClick={onUpdate}>
      <Edit className="size-4 cursor-pointer" />
    </Button>
  )
}

const DeleteButton = ({ row }: { row: Row<AgentGetOne> }) => {
  const { setOpenDeleteDialog, setCurrentAgent } = useAgentsStore()

  const onDelete = () => {
    setCurrentAgent(row.original)
    setOpenDeleteDialog(true)
  }

  return (
    <Button size={'icon'} variant={'ghost'} onClick={onDelete}>
      <Trash className="size-4 cursor-pointer" />
    </Button>
  )
}
