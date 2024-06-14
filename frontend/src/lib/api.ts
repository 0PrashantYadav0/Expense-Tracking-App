import { hc } from "hono/client"
import { type ApiRoute } from "@server/app"
import { queryOptions } from "@tanstack/react-query";
import { CreateExpense } from "@server/types/sharedType";

export const client = hc<ApiRoute>('/')

export const api = client.api;

async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return data;
}

export const userQueryOption = queryOptions({
  queryKey: ['get-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity
});

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return data;
}

export const getAllExpensesQueryOption = queryOptions({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
  staleTime: 1000*60*5
})

export async function createExpense({value}:{value: CreateExpense}) {
  const res = await api.expenses.$post({ json: value })
  if (!res) {
    throw new Error('Failed to create expense')
  }

  const {expense} = await res.json();  
  return expense;
}

export const loadingCreateExpenseQueryOption = queryOptions<{expense?: CreateExpense}>({
  queryKey: ['loading-create-expense'],
  queryFn: async () => {
    return {};
  },
})

async function getTotalOfAllExpenses() {
  const res = await api.expenses['total-spend'].$get();
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return data;
}

export const getTotalOfExpenses = queryOptions({
  queryKey: ['total-spend'],
  queryFn: getTotalOfAllExpenses,
  staleTime: Infinity,
})

export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("server error");
  }
}