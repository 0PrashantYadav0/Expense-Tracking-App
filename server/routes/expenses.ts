import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../auth/kinde";
import { db } from "../db";
import { expenses as expenseTable, insertExpensesSchema } from "../db/schema/expenses";
import { eq, desc, sum, and } from "drizzle-orm";
import { expenseSchema } from "../types/sharedType";


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
  .post("/", getUser, zValidator("json", expenseSchema), async (c) => {
    const expense = c.req.valid("json");
    const user = c.var.user;

    const validExpense = insertExpensesSchema.parse({...expense, userId: user.id})

    const result = await db.insert(expenseTable).values(validExpense).returning().then((res) => res[0]);

    return c.json({ message: "Expense added", expense: result }, 200);
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
    return c.json({ message: "Expense deleted successfully", expense: expense }, 200);
  })
  .get('/total-spend', getUser, async (c) => {
    const user = c.var.user;
    const totalSpend = await db.select({ total : sum(expenseTable.amount)}).from(expenseTable).where(eq(expenseTable.userId, user.id)).limit(1).then((res)=>res[0]);
    return c.json({ message: "Total spend found", totalSpend: totalSpend.total }, 200);
  })
  .get("/topten", getUser , async(c) => {
    const user = c.var.user;

    const expenses = await db
        .select()
        .from(expenseTable)
        .where(eq(expenseTable.userId, user.id))
        .orderBy(desc(expenseTable.createdAt))
        .limit(10);

    return c.json({ message: "All 10 expenses found successfully ", expenses: expenses }, 200)
  })