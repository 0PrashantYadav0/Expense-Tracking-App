import { userQueryOption } from '@/lib/api'
import { Login } from '@/components/Login'
import { Outlet, createFileRoute } from '@tanstack/react-router'

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) return <Login />
  return <Outlet />
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    try {
      const data = await queryClient.fetchQuery(userQueryOption)
      return data;
    } catch (error) {
      return { user: null }
    }
  },
  component: Component
})