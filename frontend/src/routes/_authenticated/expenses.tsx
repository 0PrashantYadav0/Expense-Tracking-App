import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton"
import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return data;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='m-auto max-w-3xl p-2 mt-12'>
      
        <Table>
          <TableCaption>A list of your all expense.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {isPending ? Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            )) :
            <>
              {data.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className='text-right'>{expense.amount}</TableCell>
                </TableRow>
              ))}
            </>}
          </TableBody>
        </Table>
    </div>
  )
}