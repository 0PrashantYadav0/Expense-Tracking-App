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
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from '@/components/ui/skeleton';
import { getTotalOfExpenses } from '@/lib/api';




function Index() {
  const { isPending, error, data, isFetching
  } = useQuery(getTotalOfExpenses);

  if (error) return <div>Error: {error.message}</div>

  return (
    <Card className="w-[350px] m-auto mt-12">
      <CardHeader>
        <CardTitle>Total Spend</CardTitle>
        <CardDescription>Total amount you spend daily</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending || isFetching ? <Skeleton className='h-5 w-1/4' /> : data?.totalSpend}
      </CardContent>
    </Card>
  )
}

