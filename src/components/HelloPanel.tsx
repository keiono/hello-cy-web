import React from 'react'

interface HelloPanelProps {
  message: string
}

const HelloPanel = ({ message }: HelloPanelProps): JSX.Element => {
  return <h5>Hello, Cytoscape from external server! {message}</h5>
}

export default HelloPanel
