import { ColumnDef, Row } from '@tanstack/react-table'
import { Edit, Trash, Video } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import GeneratedAvatar from '@/components/ui/generated-avatar'
import { Input } from '@/components/ui/input'
import { ResponsiveDialog } from '@/components/ui/responsive-dialog'
import { Textarea } from '@/components/ui/textarea'
import { useTRPC } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { agentUpdateSchema } from '../schema'
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
      <Trash className="size-4" />
    </div>
  )
}

const EditButton = ({ row }: { row: Row<AgentGetOne> }) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof agentUpdateSchema>>({
    resolver: zodResolver(agentUpdateSchema),
    defaultValues: {
      name: row.original.name ?? '',
      instructions: row.original.instructions ?? '',
      id: row.original.id ?? '',
    },
  })

  const updateAgentMutation = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions())
        form.reset()
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }),
  )

  function onSubmit(values: z.infer<typeof agentUpdateSchema>) {
    updateAgentMutation.mutate(values)
  }

  return (
    <>
      <Button size={'icon'} variant={'ghost'} onClick={() => setOpen(true)}>
        <Edit className="size-4 cursor-pointer" />
      </Button>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title="Update Agent"
        description="Update the agent to ask or answer questions."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <GeneratedAvatar
              seed={form.watch('name')}
              variant="botttsNeutral"
              className="border size-16"
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Agent name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Agent instructions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button
                disabled={updateAgentMutation.isPending}
                type="button"
                variant={'ghost'}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={updateAgentMutation.isPending}
                disabled={updateAgentMutation.isPending}
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveDialog>
    </>
  )
}
