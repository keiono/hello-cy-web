import { useEffect, useState } from 'react'

export function useCyStore<T>(storeName: string): T | null {
  const [store, setStore] = useState<T | null>(null)

  useEffect(() => {
    const moduleName = `cyweb/${storeName}`
    console.log('=========Loading module:', moduleName)
    import(moduleName)
      .then((module) => {
        console.log('##Module loaded:', module)
        setStore(module['useWorkspaceStore'])
      })
      .catch((error) => console.error(`Error loading ${storeName}:`, error))
  }, [storeName])

  return store
}

export function useWorkspace() {
  return useCyStore<ReturnType<typeof import('cyweb/WorkspaceStore')>>(
    'WorkspaceStore',
  )
}
