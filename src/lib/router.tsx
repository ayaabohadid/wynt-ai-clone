import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type RouterCtx = {
  path: string
  navigate: (to: string) => void
}

const Ctx = createContext<RouterCtx | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname || '/')

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || '/')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    if (to === window.location.pathname) return
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }, [])

  return <Ctx.Provider value={{ path, navigate }}>{children}</Ctx.Provider>
}

export function useRouter() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useRouter must be used inside <RouterProvider>')
  return v
}

export function Link({
  to,
  className,
  children,
  onClick,
}: {
  to: string
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  const { navigate } = useRouter()
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}
