import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type RouterCtx = {
  path: string
  search: string
  params: URLSearchParams
  navigate: (to: string) => void
}

const Ctx = createContext<RouterCtx | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(() => ({
    path: window.location.pathname || '/',
    search: window.location.search || '',
  }))

  useEffect(() => {
    const onPop = () =>
      setLoc({
        path: window.location.pathname || '/',
        search: window.location.search || '',
      })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    const current = window.location.pathname + window.location.search
    if (to === current) return
    window.history.pushState({}, '', to)
    const url = new URL(to, window.location.origin)
    setLoc({ path: url.pathname, search: url.search })
    window.scrollTo(0, 0)
  }, [])

  const params = new URLSearchParams(loc.search)
  return (
    <Ctx.Provider value={{ path: loc.path, search: loc.search, params, navigate }}>
      {children}
    </Ctx.Provider>
  )
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
