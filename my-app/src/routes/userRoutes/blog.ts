import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { protectedRoute } from "./middleware";

type Bindings = {
  DATABASE_URL: string;
  JWT_TOKEN: string;
  COOKIE_STRING: string;
};

type Variables = {
  userToken: string;
};

const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

blogRouter.get("/all", protectedRoute, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.blogs.findMany();
    console.log(allBlogs);
    if (!allBlogs) {
      c.status(404);
      return c.json({ message: "unable to fetch blogs" });
    }

    c.status(200);
    return c.json({ message: allBlogs });
  } catch (err) {
    console.log(err);
    c.status(404);
    return c.json({ message: "unable to fetch blogs" });
  } finally {
    await prisma.$disconnect();
  }
});

blogRouter.get("/blog/:id", async (c) => {});

blogRouter.get("/my/blogs", async (c) => {});

blogRouter.get("/my/blog/:id", async (c) => {});

blogRouter.post("/new-blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { title, metaDesc, content } = await c.req.json();
    console.log(title, metaDesc, content);
    c.status(201);
    return c.json({ message: "new blog created!" });
  } catch (err) {
    console.log(err);
    c.status(500);
    return c.json({ message: "unable to create new blogs!" });
  } finally {
    await prisma.$disconnect();
  }
});

export default blogRouter;
