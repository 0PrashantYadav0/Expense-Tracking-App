import { numeric,date, pgTable, serial, text, index, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  amount: numeric('amount',{ precision: 12, scale: 2}).notNull(),
  description: text('description').notNull(),
  date: date("date").notNull(),
  createdAt: timestamp('created_at').defaultNow()
}, (expenses) => {
  return {
    userIdIndex: index("name_idx").on(expenses.userId),
  }
});

export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z.string().min(3, {message: "Title must be of more then 3 characters"}).max(100),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {message: "Amount must be a number with 2 decimal places"}),
  description: z.string().min(3, {message: "Description must be of more then 3 characters"}),
});

export const selectExpensesSchema = createSelectSchema(expenses);