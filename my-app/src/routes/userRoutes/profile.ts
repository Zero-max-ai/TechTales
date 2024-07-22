import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { protectedRoute } from "./middleware";

type Bindings = {
  DATABASE_URL: string;
  JWT_TOKEN: string;
  COOKIE_STRING: string;
};

type Variables = {
  userToken: string;
};

const profileRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// ----------------------------------------fixed route token error in each and every route
// user profile fetching
profileRouter.get("/", protectedRoute, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const token = c.get("userToken");

    const user = await prisma.user.findUnique({
      where: {
        email: token.email,
      },
      select: {
        email: true,
        fullName: true,
        dob: true,
        gender: true,
        country: true,
        followers: true,
        created_at: true,
      },
    });

    c.status(200);
    return c.json({ userDetails: user });
  } catch (err) {
    console.log(err);
    c.status(500);
    return c.json({ message: "internal server error!" });
  } finally {
    await prisma.$disconnect();
  }
});

// update route
profileRouter.put("/update", protectedRoute, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const token = c.get("userToken");
    const body = await c.req.json();

    if (body.password) {
      c.status(400);
      return c.json({ message: "where does password comes in 💀?" });
    }

    const userUpdated = await prisma.user.update({
      where: { email: token.email },
      data: body,
    });

    if (!userUpdated) {
      c.status(400);
      return c.json({ message: "Something wrong here!" });
    }

    c.status(201);
    return c.json({ message: "profile updated successfully!" });
  } catch (err) {
    c.status(500);
    return c.json({ message: "internal server error!" });
  } finally {
    await prisma.$disconnect();
  }
});

profileRouter.delete("/delete/account", protectedRoute, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {

    const token = c.get("userToken");
    const body = await c.req.json();



  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
});

export default profileRouter;
