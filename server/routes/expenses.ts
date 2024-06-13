import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.string().min(3).max(100),
  title: z.string().min(3),
  amount: z.number().positive(),
  description: z.string().min(3),
});

type Expense = z.infer<typeof expenseSchema>;
const createPostSchema = expenseSchema.omit({ id: true });

const expenses: Expense[] = [ 
  {
    id: "1",
    title: "Groceries",
    amount: 50,
    description: "Weekly grocery shopping",
  },
  {
    id: "2",
    title: "Gas",
    amount: 30,
    description: "Fuel for the car",
  },
  {
    id: "3",
    title: "Dinner",
    amount: 40,
    description: "Eating out with friends",
  }
];


export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({message: "All user found successfully ", expenses: expenses}, 200)  
  })
  .post("/", zValidator("json", expenseSchema), async (c) => {
    const data = c.req.valid("json");
    if(!data) {
      return c.json({message: "Invalid data"}, 400);
    }
    expenses.push(data);
    return c.json({message : "Expense added"}, 200);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const {id} = c.req.param();
    const expense = expenses.find(e => e.id === id);
    if(!expense) {
      return c.json({message: "Expense not found"}, 404);
    }
    return c.json({message: "User with given id found", expense: expense}, 200);
  })
  .get('/total-spend', async (c) => {
    const totalSpend = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return c.json({message: "Total spend found", totalSpend: totalSpend}, 200);
  })