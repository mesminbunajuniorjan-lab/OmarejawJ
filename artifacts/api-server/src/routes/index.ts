import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import userRouter from "./user";
import productsRouter from "./products";
import missionsRouter from "./missions";
import teamRouter from "./team";
import transactionsRouter from "./transactions";
import checkinRouter from "./checkin";
import bankAccountsRouter from "./bankAccounts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(userRouter);
router.use(productsRouter);
router.use(missionsRouter);
router.use(teamRouter);
router.use(transactionsRouter);
router.use(checkinRouter);
router.use(bankAccountsRouter);

export default router;
