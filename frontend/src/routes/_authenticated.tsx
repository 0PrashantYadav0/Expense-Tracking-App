import { Button } from '@/components/ui/button'
import { userQueryOption } from '@/lib/api'
import { Outlet, createFileRoute } from '@tanstack/react-router'


const Login = () => {
  return (
    <div className='mx-auto mt-12 px-12 text-xl'>
      <p>You Have To Login</p>
      <Button variant="link" className='p-0 text-xl'>
        <a href="/api/login">Login</a>
      </Button>
    </div>
  )
}

const Component = () => {
  const { user } = Route.useRouteContext();
  if(!user) return <Login />
  return <Outlet />
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {
    const queryClient = context.queryClient
    try {
      const data = await queryClient.fetchQuery(userQueryOption)
      return data;
    } catch (error) {
      return { user : null}
    }
  },
  component: Component
})