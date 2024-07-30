import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { protectedRoute } from "./middleware";

type Bindings = {
  DATABASE_URL: string;
  JWT_TOKEN: string;
  COOKIE_STRING: string;
};

type Variables = {};

type tokenType = {
  id: string;
  email: string;
  fullName: string;
  coutry: string;
  role: 'User';
}

const bookRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

bookRouter.get("/all-bookmarks", protectedRoute, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const token: tokenType = c.get("userToken");
  } catch (err) {
    console.log(err);
    c.status(500);
    return c.json({ message: "something went wrong!" });
  } finally {
    await prisma.$disconnect();
  }
});

export default bookRouter;
