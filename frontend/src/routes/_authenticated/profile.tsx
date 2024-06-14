import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
import { userQueryOption } from "@/lib/api";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile
})


function Profile() {
  const { isPending, error, data } = useQuery(userQueryOption);

  if (error) return <div>User Not Logged In</div>

  return (
    <div className='mt-12 px-12'>
      {isPending ? "Loading..." :
        <div className='flex flex-col justify-center items-center gap-2'>
          <div className='flex gap-4 items-center'>
            <div>
              {data.user.picture && (
                <Avatar>
                  <AvatarImage src={data.user.picture} alt={data.user.given_name} />
                </Avatar>
              )}
            </div>
            <div>
              <h2 className='text-2xl'>Hello from profile</h2>
              <p className='font-bold capitalize text-3xl'>
                {data.user.given_name + ' ' + data.user.family_name || "..."}
              </p>
            </div>
          </div>
          <Button asChild className='text-xl px-6 py-4 mt-4'>
            <a href="/api/logout">Logout</a>
          </Button>
        </div>
      }
    </div>
  )
}