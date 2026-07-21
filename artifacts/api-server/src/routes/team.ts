import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, transactionsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/team", requireAuth, async (req, res): Promise<void> => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  if (!user) {
    res.status(404).json({ error: "Utilisateur non trouvé" });
    return;
  }

  // Direct referrals (VIP1)
  const vip1Users = await db.select().from(usersTable).where(eq(usersTable.referredBy, req.userId!));

  // VIP2: users referred by VIP1 users
  const vip1Ids = vip1Users.map(u => u.id);
  let vip2Users: typeof usersTable.$inferSelect[] = [];
  for (const id of vip1Ids) {
    const sub = await db.select().from(usersTable).where(eq(usersTable.referredBy, id));
    vip2Users = vip2Users.concat(sub);
  }

  // VIP3: users referred by VIP2 users
  const vip2Ids = vip2Users.map(u => u.id);
  let vip3Users: typeof usersTable.$inferSelect[] = [];
  for (const id of vip2Ids) {
    const sub = await db.select().from(usersTable).where(eq(usersTable.referredBy, id));
    vip3Users = vip3Users.concat(sub);
  }

  // Referral bonuses from transactions
  const bonusTxns = await db.select().from(transactionsTable)
    .where(eq(transactionsTable.userId, req.userId!));

  const totalRewards = bonusTxns
    .filter(t => t.type === "referral_bonus" && t.status === "completed")
    .reduce((sum, t) => sum + parseFloat(t.amount as string), 0);

  const vip1Rewards = vip1Users.length * 100;
  const vip2Rewards = vip2Users.length * 50;
  const vip3Rewards = vip3Users.length * 25;

  res.json({
    referralCode: user.referralCode,
    referralLink: `https://fn-picove.com/reg?code=${user.referralCode}`,
    totalInvited: vip1Users.length + vip2Users.length + vip3Users.length,
    totalRewards,
    vip1: { commission: 36, users: vip1Users.length, rewards: vip1Rewards },
    vip2: { commission: 1, users: vip2Users.length, rewards: vip2Rewards },
    vip3: { commission: 1, users: vip3Users.length, rewards: vip3Rewards },
  });
});

export default router;
