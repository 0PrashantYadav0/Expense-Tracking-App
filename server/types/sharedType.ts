import { insertExpensesSchema } from '../db/schema/expenses';

export const expenseSchema = insertExpensesSchema.omit({ createdAt: true, userId: true});