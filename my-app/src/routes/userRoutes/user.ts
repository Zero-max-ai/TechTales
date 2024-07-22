import { Hono } from "hono";
import authRouter from "./auth";
import profileRouter from './profile'

type Bindings = {
  DATABASE_URL: string;
  JWT_TOKEN: string;
};

const userRouter = new Hono<{
  Bindings: Bindings;
}>();

userRouter.route("/auth", authRouter);
userRouter.route('/profile', profileRouter);

export default userRouter;
