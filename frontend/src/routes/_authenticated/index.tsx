import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from '@/components/ui/skeleton';


async function getDataQuery() {
  const res = await api.expenses['total-spend'].$get();
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return data;
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ['total-spend'],
    queryFn: getDataQuery
  });

  if (error) return <div>Error: {error.message}</div>

  return (
    <Card className="w-[350px] m-auto mt-12">
      <CardHeader>
        <CardTitle>Total Spend</CardTitle>
        <CardDescription>Total amount you spend daily</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? <Skeleton className='h-5 w-1/4' /> : data?.totalSpend}
      </CardContent>
    </Card>
  )
}

