import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../auth/kinde";
import { db } from "../db";
import { expenses as expenseTable } from "../db/schema/expenses";
import { eq, desc, sum, and } from "drizzle-orm";
import { createExpenseSchema } from "../types/sharedType";


export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
        .select()
        .from(expenseTable)
        .where(eq(expenseTable.userId, user.id))
        .orderBy(desc(expenseTable.createdAt))
        .limit(100);
    
    return c.json({ message: "All user found successfully ", expenses: expenses }, 200)
  })
  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const user = c.var.user;
    const data = c.req.valid("json");
    if (!data) {
      return c.json({ message: "Invalid data" }, 400);
    }

    const result = await db.insert(expenseTable).values({
      ...data,
      userId: user.id,
    }).returning();

    return c.json({ message: "Expense added", data: result }, 201);
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id"));
    const expense = await db
        .select()
        .from(expenseTable)
        .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
        .then((res) => res[0]);

    if (!expense) {
      return c.json({ message: "Expense not found" }, 404);
    }
    return c.json({ message: "User with given id found", expense: expense }, 200);
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id"));
    const expense = await db
        .delete(expenseTable)
        .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
        .returning()
        .then((res) => res[0]);

    if (!expense) {
      return c.json({ message: "Expense not found" }, 404);
    }
    return c.json({ message: "User with given id found", expense: expense }, 200);
  })
  .get('/total-spend', getUser, async (c) => {
    const user = c.var.user;
    const totalSpend = await db.select({ total : sum(expenseTable.amount)}).from(expenseTable).where(eq(expenseTable.userId, user.id)).limit(1).then((res)=>res[0]);
    return c.json({ message: "Total spend found", totalSpend: totalSpend.total }, 200);
  })