import React from 'react'
import ListHeader from './list-header'
import SearchAgents from './table/header'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 space-y-6">
      <ListHeader />
      <SearchAgents />
      {children}
    </div>
  )
}

export default Layout
