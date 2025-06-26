import ErrorState from '@/components/ui/error-state'
import LoadingState from '@/components/ui/loading-state'

export const AgentLoading = () => (
  <LoadingState
    title="Loading Agents"
    description="Please wait while we load your agents."
  />
)

export const AgentError = () => (
  <ErrorState
    title="Error Loading Agents"
    description="Please try again later."
  />
)
