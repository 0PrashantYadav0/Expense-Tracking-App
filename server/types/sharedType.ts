import { insertExpensesSchema } from '../db/schema/expenses';
import { z } from 'zod';

export const expenseSchema = insertExpensesSchema.omit({ createdAt: true, userId: true, id:true});

export type CreateExpense = z.infer<typeof expenseSchema>