'use client'

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
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { agentInsertSchema } from './schema'

const ListHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl">My Agents</h1>
      <CreateAgentDialog />
    </div>
  )
}

const CreateAgentDialog = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: '',
      instructions: '',
    },
  })

  const createAgentMutation = useMutation(
    trpc.agents.create.mutationOptions({
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

  function onSubmit(values: z.infer<typeof agentInsertSchema>) {
    createAgentMutation.mutate(values)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4 mr-1" /> Add Agents
      </Button>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title="Create Agent"
        description="Create a new agent to ask or answer questions."
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
                disabled={createAgentMutation.isPending}
                type="button"
                variant={'ghost'}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={createAgentMutation.isPending}
                disabled={createAgentMutation.isPending}
                type="submit"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveDialog>
    </>
  )
}

export default ListHeader
