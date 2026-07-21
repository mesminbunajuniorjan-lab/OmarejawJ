import { Router, type IRouter } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, checkinsTable, usersTable, transactionsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

const DAILY_REWARD = 50;

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

router.get("/checkin/status", requireAuth, async (req, res): Promise<void> => {
  const today = getTodayDate();

  const recentCheckins = await db
    .select()
    .from(checkinsTable)
    .where(eq(checkinsTable.userId, req.userId!))
    .orderBy(desc(checkinsTable.checkinDate))
    .limit(30);

  const checkedInToday = recentCheckins.some(c => c.checkinDate === today);

  // Calculate total rewards
  const totalRewards = recentCheckins.reduce(
    (sum, c) => sum + parseFloat(c.reward as string),
    0
  );

  // Current streak from latest checkin
  const streak = recentCheckins.length > 0 ? recentCheckins[0].streak : 0;

  const nextCheckinAt = checkedInToday
    ? new Date(new Date().setHours(24, 0, 0, 0)).toISOString()
    : null;

  res.json({
    checkedInToday,
    streak,
    totalRewards,
    dailyReward: DAILY_REWARD,
    nextCheckinAt,
  });
});

router.post("/checkin", requireAuth, async (req, res): Promise<void> => {
  const today = getTodayDate();

  const todayCheckin = await db
    .select()
    .from(checkinsTable)
    .where(and(eq(checkinsTable.userId, req.userId!), eq(checkinsTable.checkinDate, today)))
    .limit(1);

  if (todayCheckin.length > 0) {
    res.status(400).json({ error: "Vous avez déjà pointé aujourd'hui" });
    return;
  }

  // Calculate streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const lastCheckin = await db
    .select()
    .from(checkinsTable)
    .where(eq(checkinsTable.userId, req.userId!))
    .orderBy(desc(checkinsTable.checkinDate))
    .limit(1);

  const wasYesterday = lastCheckin.length > 0 && lastCheckin[0].checkinDate === yesterdayStr;
  const newStreak = wasYesterday ? (lastCheckin[0].streak + 1) : 1;

  await db.insert(checkinsTable).values({
    userId: req.userId!,
    checkinDate: today,
    reward: DAILY_REWARD.toString(),
    streak: newStreak,
  });

  // Credit the user
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  const newBalance = parseFloat(user.balance as string) + DAILY_REWARD;

  await db.update(usersTable).set({
    balance: newBalance.toFixed(2),
    totalEarned: (parseFloat(user.totalEarned as string) + DAILY_REWARD).toFixed(2),
  }).where(eq(usersTable.id, req.userId!));

  await db.insert(transactionsTable).values({
    userId: req.userId!,
    type: "daily_checkin",
    amount: DAILY_REWARD.toFixed(2),
    status: "completed",
    description: "Récompense de pointage quotidien",
  });

  // Calculate total rewards
  const allCheckins = await db
    .select()
    .from(checkinsTable)
    .where(eq(checkinsTable.userId, req.userId!));

  const totalRewards = allCheckins.reduce(
    (sum, c) => sum + parseFloat(c.reward as string),
    0
  );

  res.json({
    reward: DAILY_REWARD,
    streak: newStreak,
    totalRewards,
    message: `Bravo ! Vous avez reçu ${DAILY_REWARD} XOF pour votre pointage du jour !`,
  });
});

export default router;
