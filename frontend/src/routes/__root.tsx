import Navbar from '@/components/Navbar'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from "@/components/ui/sonner"

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
      <Toaster/>
    </>
  )
}