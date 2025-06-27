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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { agentUpdateSchema } from '../schema'
import useAgentsStore from '../store'

const UpdateAgentDialog = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const {
    openUpdateDialog: open,
    setOpenUpdateDialog: setOpen,
    currentAgent,
  } = useAgentsStore()

  const form = useForm<z.infer<typeof agentUpdateSchema>>({
    resolver: zodResolver(agentUpdateSchema),
    defaultValues: {
      name: currentAgent?.name ?? '',
      instructions: currentAgent?.instructions ?? '',
      id: currentAgent?.id ?? '',
    },
  })

  const updateAgentMutation = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        )
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

  useEffect(() => {
    if (!currentAgent) return
    form.reset({
      ...currentAgent,
    })
  }, [currentAgent, form])

  return (
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
  )
}

export default UpdateAgentDialog
