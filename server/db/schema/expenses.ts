import { numeric, pgTable, serial, text, index } from 'drizzle-orm/pg-core';

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  amount: numeric('amount',{ precision: 12, scale: 2}).notNull(),
  description: text('description').notNull(),
}, (expenses) => {
  return {
    userIdIndex: index("name_idx").on(expenses.userId),
  }
});
