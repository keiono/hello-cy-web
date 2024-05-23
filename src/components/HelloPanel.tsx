import React, { useEffect, useState } from 'react'

interface HelloPanelProps {
  message: string,
  
}

const loadModule = async (): Promise<any> => {
  try {
    const module = await import('cyweb/useDataStore')
    console.log('######### Loaded useDataStore Hook:', module, module.default)
    return module.default
  } catch (err) {
    console.error('Failed to load useDataStore Hook', err)
  }
}

const HelloPanel = ({ message }: HelloPanelProps): JSX.Element => {
  const [useDataStore, setUseDataStore] = useState(null)

  useEffect(() => {
    const loadModule = async () => {
      try {
        const module = await import('cyweb/useDataStore')
        console.log(
          '######### Loaded useDataStore Hook:',
          module,
          module.default,
        )
        setUseDataStore(module.default)
      } catch (err) {
        console.error('Failed to load useDataStore Hook', err)
      }
    }

    loadModule()
  }, [])

  console.log('Ready##:', useDataStore)

  return <h5>Hello, Cytoscape from external server! {message}</h5>
}

export default HelloPanel
