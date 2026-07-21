import { pgTable, serial, integer, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userProductsTable = pgTable("user_products", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  productName: text("product_name").notNull(),
  purchaseDate: timestamp("purchase_date").notNull().defaultNow(),
  expiryDate: timestamp("expiry_date").notNull(),
  dailyReturn: numeric("daily_return", { precision: 15, scale: 2 }).notNull(),
  totalReturn: numeric("total_return", { precision: 15, scale: 2 }).notNull(),
  earnedSoFar: numeric("earned_so_far", { precision: 15, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("active"),
  imageUrl: text("image_url").notNull().default(""),
});

export const insertUserProductSchema = createInsertSchema(userProductsTable).omit({ id: true });
export type InsertUserProduct = z.infer<typeof insertUserProductSchema>;
export type UserProduct = typeof userProductsTable.$inferSelect;
