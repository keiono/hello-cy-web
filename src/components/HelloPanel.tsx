import React from 'react'

interface HelloPanelProps {
  message: string
}

export const HelloPanel = ({ message }: HelloPanelProps): JSX.Element => {
  return <h1>Hello, Cytoscape world ==== {message}</h1>
}
