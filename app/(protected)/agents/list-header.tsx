import CreateAgentDialog from './dialog/create-agent-dialog'

const ListHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl">My Agents</h1>
      <CreateAgentDialog />
    </div>
  )
}

export default ListHeader
