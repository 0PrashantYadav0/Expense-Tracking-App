import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from 'hono/bun'

const app = new Hono();

app.use(logger());

const apiRoute = app.basePath("/api/").route("/expenses", expensesRoute);

app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))


export default app;
export type ApiRoute = typeof apiRoute;