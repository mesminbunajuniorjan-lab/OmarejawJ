import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, userMissionsTable, transactionsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

const MISSION_CONFIG = [
  { level: 1, name: "Niveau 1", description: "Invitez 3 investisseurs de niveau 1 pour recevoir", commission: 36, required: 3, objective: 3, rewards: 1000 },
  { level: 2, name: "Niveau 2", description: "Invitez 10 investisseurs de niveau 1 pour recevoir", commission: 1, required: 10, objective: 10, rewards: 2500 },
  { level: 3, name: "Niveau 3", description: "Invitez 30 investisseurs de niveau 1 pour recevoir", commission: 1, required: 30, objective: 30, rewards: 5000 },
];

router.get("/missions", requireAuth, async (req, res): Promise<void> => {
  const userMissions = await db.select().from(userMissionsTable).where(eq(userMissionsTable.userId, req.userId!));

  // Ensure all 3 levels exist
  const missionMap = new Map(userMissions.map(m => [m.level, m]));

  const levels = MISSION_CONFIG.map(config => {
    const userMission = missionMap.get(config.level);
    const current = userMission?.current ?? 0;
    const rewards = parseFloat((userMission?.rewards as string) ?? "0");
    const status = userMission?.status ?? "in_progress";

    return {
      level: config.level,
      name: config.name,
      description: config.description,
      commission: config.commission,
      required: config.required,
      current,
      objective: config.objective,
      rewards,
      status,
    };
  });

  const totalRewards = levels.reduce((sum, l) => sum + l.rewards, 0);
  const totalCount = levels.reduce((sum, l) => sum + l.current, 0);

  res.json({ totalRewards, totalCount, levels });
});

export default router;
