import Navbar from '@/components/Navbar'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface MyRootContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRootContext>()({
  component: Root,
})

function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
    </>
  )
}