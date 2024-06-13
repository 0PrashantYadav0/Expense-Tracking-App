import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
import { userQueryOption } from "@/lib/api";
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile
})


function Profile() {
  const { isPending, error, data } = useQuery(userQueryOption);

  if(error) return <div>User Not Logged In</div>

  return (
    <div className='mt-12 px-12'>
      {isPending ? "Loading..." : 
        <>
          <h2 className='text-2xl'>Hello from profile</h2>
          <p className='font-bold capitalize text-3xl'>{data.user.given_name + ' ' + data.user.family_name || "..."}</p>
          <Button variant="link" className='text-xl p-0'>
            <a href="/api/logout">Logout</a>
          </Button>
        </>
      }
    </div>
  )
}