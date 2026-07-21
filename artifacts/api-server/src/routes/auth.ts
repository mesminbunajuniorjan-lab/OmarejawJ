import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, transactionsTable, userMissionsTable } from "@workspace/db";
import { RegisterBody, LoginBody } from "@workspace/api-zod";
import crypto from "crypto";

const router: IRouter = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "mcdo_salt_2024").digest("hex");
}

function generateToken(userId: number): string {
  return Buffer.from(JSON.stringify({ userId, ts: Date.now() })).toString("base64");
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

function formatUser(user: typeof usersTable.$inferSelect) {
  return {
    id: user.id,
    phone: user.phone,
    countryCode: user.countryCode,
    balance: parseFloat(user.balance as string),
    totalEarned: parseFloat(user.totalEarned as string),
    referralCode: user.referralCode,
    referralLink: `https://fn-picove.com/reg?code=${user.referralCode}`,
    vipLevel: user.vipLevel,
    createdAt: user.createdAt.toISOString(),
  };
}

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { phone, password, countryCode, referralCode } = parsed.data;

  const existing = await db.select().from(usersTable).where(eq(usersTable.phone, phone)).limit(1);
  if (existing.length > 0) {
    res.status(400).json({ error: "Ce numéro est déjà enregistré" });
    return;
  }

  let referrerId: number | null = null;
  if (referralCode) {
    const referrer = await db.select().from(usersTable).where(eq(usersTable.referralCode, referralCode)).limit(1);
    if (referrer.length > 0) referrerId = referrer[0].id;
  }

  const [user] = await db.insert(usersTable).values({
    phone,
    passwordHash: hashPassword(password),
    countryCode: countryCode || "+229",
    balance: "500",
    totalEarned: "0",
    totalWithdrawn: "0",
    referralCode: generateReferralCode(),
    referredBy: referrerId ?? undefined,
    vipLevel: 1,
  }).returning();

  // Welcome bonus transaction
  await db.insert(transactionsTable).values({
    userId: user.id,
    type: "welcome_bonus",
    amount: "500",
    status: "completed",
    description: "Bonus de bienvenue",
  });

  // Initialize mission levels
  for (const level of [1, 2, 3]) {
    await db.insert(userMissionsTable).values({ userId: user.id, level, current: 0, rewards: "0", status: "in_progress" });
  }

  const token = generateToken(user.id);
  res.status(201).json({ token, user: formatUser(user) });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { phone, password } = parsed.data;
  const [user] = await db.select().from(usersTable).where(eq(usersTable.phone, phone)).limit(1);

  if (!user || user.passwordHash !== hashPassword(password)) {
    res.status(401).json({ error: "Téléphone ou mot de passe incorrect" });
    return;
  }

  const token = generateToken(user.id);
  res.json({ token, user: formatUser(user) });
});

export default router;
