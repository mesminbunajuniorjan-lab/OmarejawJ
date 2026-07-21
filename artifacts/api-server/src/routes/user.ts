import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, userProductsTable, transactionsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/user/profile", requireAuth, async (req, res): Promise<void> => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  if (!user) {
    res.status(404).json({ error: "Utilisateur non trouvé" });
    return;
  }

  res.json({
    id: user.id,
    phone: user.phone,
    countryCode: user.countryCode,
    balance: parseFloat(user.balance as string),
    totalEarned: parseFloat(user.totalEarned as string),
    referralCode: user.referralCode,
    referralLink: `https://fn-picove.com/reg?code=${user.referralCode}`,
    vipLevel: user.vipLevel,
    createdAt: user.createdAt.toISOString(),
  });
});

router.get("/user/stats", requireAuth, async (req, res): Promise<void> => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  if (!user) {
    res.status(404).json({ error: "Utilisateur non trouvé" });
    return;
  }

  const myProducts = await db.select().from(userProductsTable).where(eq(userProductsTable.userId, req.userId!));
  const activeProducts = myProducts.filter(p => p.status === "active").length;
  const dailyEarnings = myProducts
    .filter(p => p.status === "active")
    .reduce((sum, p) => sum + parseFloat(p.dailyReturn as string), 0);

  // Count referred users
  const referred = await db.select().from(usersTable).where(eq(usersTable.referredBy, req.userId!));

  // Total rewards from referrals
  const referralTxns = await db.select().from(transactionsTable)
    .where(eq(transactionsTable.userId, req.userId!));
  const totalRewards = referralTxns
    .filter(t => t.type === "referral_bonus" && t.status === "completed")
    .reduce((sum, t) => sum + parseFloat(t.amount as string), 0);

  res.json({
    balance: parseFloat(user.balance as string),
    totalEarned: parseFloat(user.totalEarned as string),
    totalWithdrawn: parseFloat(user.totalWithdrawn as string),
    dailyEarnings,
    activeProducts,
    totalInvited: referred.length,
    totalRewards,
  });
});

export default router;
