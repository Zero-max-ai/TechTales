import { Hono } from "hono";
import authRouter from "./auth";
import profileRouter from "./profile";
import blogRouter from "./blog";

const userRouter = new Hono();

userRouter.route("/auth", authRouter);
userRouter.route("/profile", profileRouter);
userRouter.route("/blog", blogRouter);

export default userRouter;
