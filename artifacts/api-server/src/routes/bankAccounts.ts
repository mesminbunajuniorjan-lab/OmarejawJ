import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, bankAccountsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { AddBankAccountBody, DeleteBankAccountParams } from "@workspace/api-zod";

const router: IRouter = Router();

function formatAccount(a: typeof bankAccountsTable.$inferSelect) {
  return {
    id: a.id,
    bankName: a.bankName,
    accountNumber: a.accountNumber,
    accountHolder: a.accountHolder,
    isDefault: a.isDefault,
    createdAt: a.createdAt.toISOString(),
  };
}

router.get("/bank-accounts", requireAuth, async (req, res): Promise<void> => {
  const accounts = await db
    .select()
    .from(bankAccountsTable)
    .where(eq(bankAccountsTable.userId, req.userId!));

  res.json(accounts.map(formatAccount));
});

router.post("/bank-accounts", requireAuth, async (req, res): Promise<void> => {
  const parsed = AddBankAccountBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { bankName, accountNumber, accountHolder, isDefault } = parsed.data;

  // If setting as default, unset all others
  if (isDefault) {
    await db
      .update(bankAccountsTable)
      .set({ isDefault: false })
      .where(eq(bankAccountsTable.userId, req.userId!));
  }

  const [account] = await db
    .insert(bankAccountsTable)
    .values({
      userId: req.userId!,
      bankName,
      accountNumber,
      accountHolder,
      isDefault: isDefault ?? false,
    })
    .returning();

  res.status(201).json(formatAccount(account));
});

router.delete("/bank-accounts/:id", requireAuth, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteBankAccountParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }

  const [deleted] = await db
    .delete(bankAccountsTable)
    .where(
      and(
        eq(bankAccountsTable.id, params.data.id),
        eq(bankAccountsTable.userId, req.userId!)
      )
    )
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Compte non trouvé" });
    return;
  }

  res.sendStatus(204);
});

export default router;
