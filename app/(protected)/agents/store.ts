import { create } from 'zustand'
import { AgentGetOne } from './type'

type State = {
  openUpdateDialog: boolean
  openDeleteDialog: boolean
  currentAgent: AgentGetOne | undefined
}

type Action = {
  setOpenUpdateDialog: (open: boolean) => void
  setOpenDeleteDialog: (open: boolean) => void
  setCurrentAgent: (agent: State['currentAgent']) => void
}

const useAgentsStore = create<State & Action>((set) => ({
  currentAgent: undefined,
  openUpdateDialog: false,
  openDeleteDialog: false,

  setCurrentAgent: (agent) => set(() => ({ currentAgent: agent })),
  setOpenUpdateDialog: (open) => set(() => ({ openUpdateDialog: open })),
  setOpenDeleteDialog: (open) => set(() => ({ openDeleteDialog: open })),
}))

export default useAgentsStore
