import ErrorState from '@/components/ui/error-state'
import LoadingState from '@/components/ui/loading-state'

export const MeetingLoading = () => (
  <LoadingState
    title="Loading Meetings"
    description="Please wait while we load your meetings."
  />
)

export const MeetingError = () => (
  <ErrorState
    title="Error Loading Meetings"
    description="Please try again later."
  />
)
