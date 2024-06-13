import { hc } from "hono/client"
import { type ApiRoute } from "@server/app"

export const client = hc<ApiRoute>('/')

export const api = client.api;