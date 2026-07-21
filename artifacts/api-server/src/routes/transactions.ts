import { Router, type IRouter } from "express";
import { eq, desc, and, inArray } from "drizzle-orm";
import { db, transactionsTable, usersTable, bankAccountsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { RechargeBody, WithdrawBody } from "@workspace/api-zod";

const router: IRouter = Router();

function formatTxn(t: typeof transactionsTable.$inferSelect) {
  return {
    id: t.id,
    type: t.type,
    amount: parseFloat(t.amount as string),
    status: t.status,
    createdAt: t.createdAt.toISOString(),
    description: t.description,
  };
}

router.get("/transactions", requireAuth, async (req, res): Promise<void> => {
  const txns = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, req.userId!))
    .orderBy(desc(transactionsTable.createdAt))
    .limit(50);
  res.json(txns.map(formatTxn));
});

router.get("/transactions/recharge-history", requireAuth, async (req, res): Promise<void> => {
  const txns = await db
    .select()
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.userId, req.userId!),
        eq(transactionsTable.type, "recharge")
      )
    )
    .orderBy(desc(transactionsTable.createdAt))
    .limit(50);
  res.json(txns.map(formatTxn));
});

router.get("/transactions/withdraw-history", requireAuth, async (req, res): Promise<void> => {
  const txns = await db
    .select()
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.userId, req.userId!),
        eq(transactionsTable.type, "withdraw")
      )
    )
    .orderBy(desc(transactionsTable.createdAt))
    .limit(50);
  res.json(txns.map(formatTxn));
});

router.post("/transactions/recharge", requireAuth, async (req, res): Promise<void> => {
  const parsed = RechargeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { amount, method, countryCode } = parsed.data;

  const [txn] = await db
    .insert(transactionsTable)
    .values({
      userId: req.userId!,
      type: "recharge",
      amount: amount.toFixed(2),
      status: "pending",
      description: `Recharge via ${method}${countryCode ? ` (${countryCode})` : ""}`,
    })
    .returning();

  res.status(201).json(formatTxn(txn));
});

router.post("/transactions/withdraw", requireAuth, async (req, res): Promise<void> => {
  const parsed = WithdrawBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { amount, bankAccountId } = parsed.data;

  // Verify bank account belongs to user
  const [bankAccount] = await db
    .select()
    .from(bankAccountsTable)
    .where(
      and(
        eq(bankAccountsTable.id, bankAccountId),
        eq(bankAccountsTable.userId, req.userId!)
      )
    )
    .limit(1);

  if (!bankAccount) {
    res.status(404).json({ error: "Compte bancaire non trouvé" });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.userId!))
    .limit(1);

  const balance = parseFloat(user.balance as string);
  if (balance < amount) {
    res.status(400).json({ error: "Solde insuffisant" });
    return;
  }

  const fee = amount * 0.2;
  const netAmount = amount - fee;

  await db
    .update(usersTable)
    .set({
      balance: (balance - amount).toFixed(2),
      totalWithdrawn: (parseFloat(user.totalWithdrawn as string) + amount).toFixed(2),
    })
    .where(eq(usersTable.id, req.userId!));

  const [txn] = await db
    .insert(transactionsTable)
    .values({
      userId: req.userId!,
      type: "withdraw",
      amount: (-amount).toFixed(2),
      status: "pending",
      description: `Retrait vers ${bankAccount.bankName} - ${bankAccount.accountNumber} (net: ${netAmount.toFixed(0)} XOF)`,
    })
    .returning();

  res.status(201).json(formatTxn(txn));
});

export default router;
