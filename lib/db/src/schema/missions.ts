import { pgTable, serial, integer, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userMissionsTable = pgTable("user_missions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  level: integer("level").notNull(), // 1, 2, 3
  current: integer("current").notNull().default(0),
  rewards: numeric("rewards", { precision: 15, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("in_progress"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserMissionSchema = createInsertSchema(userMissionsTable).omit({ id: true });
export type InsertUserMission = z.infer<typeof insertUserMissionSchema>;
export type UserMission = typeof userMissionsTable.$inferSelect;
