import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, productsTable, userProductsTable, usersTable, transactionsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";
import { GetProductParams } from "@workspace/api-zod";

const router: IRouter = Router();

function formatProduct(p: typeof productsTable.$inferSelect) {
  return {
    id: p.id,
    name: p.name,
    price: parseFloat(p.price as string),
    durationDays: p.durationDays,
    dailyReturn: parseFloat(p.dailyReturn as string),
    totalReturn: parseFloat(p.totalReturn as string),
    imageUrl: p.imageUrl,
    category: p.category,
    description: p.description,
    featured: p.featured,
  };
}

router.get("/products", async (_req, res): Promise<void> => {
  const products = await db.select().from(productsTable).orderBy(productsTable.price);
  res.json(products.map(formatProduct));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProductParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: "ID invalide" });
    return;
  }

  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, params.data.id)).limit(1);
  if (!product) {
    res.status(404).json({ error: "Produit non trouvé" });
    return;
  }

  res.json(formatProduct(product));
});

router.post("/products/:id/purchase", requireAuth, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const productId = parseInt(rawId, 10);

  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId)).limit(1);
  if (!product) {
    res.status(404).json({ error: "Produit non trouvé" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  const userBalance = parseFloat(user.balance as string);
  const productPrice = parseFloat(product.price as string);

  if (userBalance < productPrice) {
    res.status(400).json({ error: "Solde insuffisant" });
    return;
  }

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + product.durationDays);

  const [userProduct] = await db.insert(userProductsTable).values({
    userId: req.userId!,
    productId: product.id,
    productName: product.name,
    expiryDate,
    dailyReturn: product.dailyReturn,
    totalReturn: product.totalReturn,
    earnedSoFar: "0",
    status: "active",
    imageUrl: product.imageUrl,
  }).returning();

  // Deduct from balance
  await db.update(usersTable).set({
    balance: (userBalance - productPrice).toFixed(2),
  }).where(eq(usersTable.id, req.userId!));

  // Log transaction
  await db.insert(transactionsTable).values({
    userId: req.userId!,
    type: "purchase",
    amount: (-productPrice).toFixed(2),
    status: "completed",
    description: `Achat ${product.name}`,
  });

  res.status(201).json({
    id: userProduct.id,
    productId: userProduct.productId,
    productName: userProduct.productName,
    purchaseDate: userProduct.purchaseDate.toISOString(),
    expiryDate: userProduct.expiryDate.toISOString(),
    dailyReturn: parseFloat(userProduct.dailyReturn as string),
    totalReturn: parseFloat(userProduct.totalReturn as string),
    earnedSoFar: parseFloat(userProduct.earnedSoFar as string),
    status: userProduct.status,
    imageUrl: userProduct.imageUrl,
  });
});

router.get("/my-products", requireAuth, async (req, res): Promise<void> => {
  const products = await db.select().from(userProductsTable).where(eq(userProductsTable.userId, req.userId!));
  res.json(products.map(p => ({
    id: p.id,
    productId: p.productId,
    productName: p.productName,
    purchaseDate: p.purchaseDate.toISOString(),
    expiryDate: p.expiryDate.toISOString(),
    dailyReturn: parseFloat(p.dailyReturn as string),
    totalReturn: parseFloat(p.totalReturn as string),
    earnedSoFar: parseFloat(p.earnedSoFar as string),
    status: p.status,
    imageUrl: p.imageUrl,
  })));
});

export default router;
