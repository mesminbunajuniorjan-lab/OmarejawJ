import { Request, Response, NextFunction } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    if (!payload.userId) {
      res.status(401).json({ error: "Token invalide" });
      return;
    }
    const [user] = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.id, payload.userId)).limit(1);
    if (!user) {
      res.status(401).json({ error: "Utilisateur non trouvé" });
      return;
    }
    req.userId = user.id;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
}
