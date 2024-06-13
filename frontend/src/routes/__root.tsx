import Navbar from '@/components/Navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Root,
})

function Root(){ 
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
    </>
  )
}