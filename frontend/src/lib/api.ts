import { hc } from "hono/client"
import { type ApiRoute } from "@server/app"
import { queryOptions } from "@tanstack/react-query";

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