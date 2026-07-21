import { pgTable, serial, text, numeric, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 15, scale: 2 }).notNull(),
  durationDays: integer("duration_days").notNull(),
  dailyReturn: numeric("daily_return", { precision: 15, scale: 2 }).notNull(),
  totalReturn: numeric("total_return", { precision: 15, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull().default("standard"),
  description: text("description").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
