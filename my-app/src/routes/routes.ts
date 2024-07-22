import { Hono } from "hono";
import userRouter from "./userRoutes/user";

const router = new Hono();

router.route("/user", userRouter);

export default router;
