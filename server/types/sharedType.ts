import { z } from 'zod';

export const expenseSchema = z.object({
  id: z.string().min(3).max(100),
  userId: z.string().min(3).max(100),
  title: z.string().min(3, {message: "Title must be of more then 3 characters"}).max(100),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {message: "Amount must be a number with 2 decimal places"}),
  description: z.string().min(3, {message: "Description must be of more then 3 characters"}),
});

export const createExpenseSchema = expenseSchema.omit({ id: true, userId: true});