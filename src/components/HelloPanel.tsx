import React, { useEffect, useState } from 'react'

// Dynamic import from the host app
import { useWorkspaceStore } from 'cyweb/WorkspaceStore'

interface HelloPanelProps {
  message: string
}

const HelloPanel = ({ message }: HelloPanelProps): JSX.Element => {
  console.log('useWorkspace:', useWorkspaceStore)

  useEffect(() => {
    console.log('useWorkspace updated:', useWorkspaceStore)
  }, [useWorkspaceStore])

  const workspace = useWorkspaceStore((state: any) => state.workspace)
  console.log('workspace:', workspace)

  return (
    <div>
      <h5>Hello, Cytoscape from external server! {message}</h5>
      <p>Current Netork ID: {workspace.currentNetworkId}</p>
    </div>
  )
}

export default HelloPanel
