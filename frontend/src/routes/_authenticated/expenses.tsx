import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { deleteExpense, getAllExpensesQueryOption, getTotalOfExpenses, loadingCreateExpenseQueryOption } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';


export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOption);

  const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOption)

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='max-w-3xl p-2 my-6 mx-4 md:m-auto md:mt-12'>
      <Table>
        <TableCaption>A list of your all expense.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">id</TableHead>
            <TableHead className="w-[120px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className='text-right'>Date</TableHead>
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
              {loadingCreateExpense?.expense ? 
                <TableRow>
                  <TableCell className="font-medium"><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell>{loadingCreateExpense?.expense?.title}</TableCell>
                  <TableCell>{loadingCreateExpense?.expense?.description}</TableCell>
                  <TableCell>{loadingCreateExpense?.expense?.amount}</TableCell>
                  <TableCell className='text-right'>{loadingCreateExpense?.expense?.date.split("T")[0]}</TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell className="font-medium"><Skeleton className="h-4 w-full" /></TableCell>
                </TableRow> : <></>
              }
              {data.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell className='text-right'>{expense.date.split("T")[0]}</TableCell>
                  <TableCell className='text-right'>
                    <ExpenseDeleteButton id={expense.id}/>
                  </TableCell>
                </TableRow>
              ))}
            </>}
        </TableBody>
      </Table>
    </div>
  )
}


function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error", {
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(
        getAllExpensesQueryOption.queryKey,
        (existingExpenses) => ({
          message: existingExpenses?.message || 'Default message',
          expenses: existingExpenses?.expenses.filter((e) => e.id !== id) || [],
        })
      );
      queryClient.invalidateQueries(getTotalOfExpenses);
      toast("Expense Deleted", {
        description: `Successfully deleted expense: ${id}`,
      });
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
      variant="outline"
      size="icon"
    >
      {mutation.isPending ? "..." : <Trash className="h-4 w-4" />}
    </Button>
  );
}