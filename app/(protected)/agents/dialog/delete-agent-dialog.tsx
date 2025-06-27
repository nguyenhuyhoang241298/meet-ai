import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '@/components/ui/responsive-dialog'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import useAgentsStore from '../store'

const DeleteAgentDialog = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const {
    openDeleteDialog: open,
    setOpenDeleteDialog: setOpen,
    currentAgent,
  } = useAgentsStore()

  const deleteAgentMutation = useMutation(
    trpc.agents.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        )
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }),
  )

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="Delete Agent"
      description={`Are you sure you want to delete ${currentAgent?.name}?`}
    >
      <div className="flex items-center justify-between">
        <Button
          disabled={deleteAgentMutation.isPending}
          type="button"
          variant={'ghost'}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          isLoading={deleteAgentMutation.isPending}
          disabled={deleteAgentMutation.isPending}
          type="submit"
          variant={'destructive'}
          onClick={() => {
            if (!currentAgent) return
            deleteAgentMutation.mutate({ id: currentAgent.id })
          }}
        >
          Delete
        </Button>
      </div>
    </ResponsiveDialog>
  )
}

export default DeleteAgentDialog
