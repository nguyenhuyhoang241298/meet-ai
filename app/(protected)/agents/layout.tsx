import React from 'react'
import ListHeader from './list-header'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 space-y-6">
      <ListHeader />
      {children}
    </div>
  )
}

export default Layout
