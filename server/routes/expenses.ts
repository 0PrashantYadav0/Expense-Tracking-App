import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../auth/kinde";
import { db } from "../db";
import { expenses as expenseTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.string().min(3).max(100),
  userId: z.string().min(3).max(100),
  title: z.string().min(3),
  amount: z.string(),
  description: z.string().min(3),
});

type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({ id: true, userId: true});

const expenses: Expense[] = [
  {
    id: "1",
    userId: "1",
    title: "First Expense",
    amount: "100",
    description: "This is the first expense",
  },
  {
    id: "2",
    userId: "1",
    title: "Second Expense",
    amount: "200",
    description: "This is the second expense",
  },
  {
    id: "3",
    userId: "1",
    title: "Third Expense",
    amount: "300",
    description: "This is the third expense",
  },
];


export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
        .select()
        .from(expenseTable)
        .where(eq(expenseTable.userId, user.id));
    
    return c.json({ message: "All user found successfully ", expenses: expenses }, 200)
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
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
    const { id } = c.req.param();
    const expense = expenses.find(e => e.id === id);
    if (!expense) {
      return c.json({ message: "Expense not found" }, 404);
    }
    return c.json({ message: "User with given id found", expense: expense }, 200);
  })
  .get('/total-spend', getUser, async (c) => {
    const totalSpend = expenses.reduce((acc, expense) => acc + +expense.amount, 0);
    return c.json({ message: "Total spend found", totalSpend: totalSpend }, 200);
  })