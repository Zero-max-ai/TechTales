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

// @desc- fetching all the blogs contian in db --- add the pagination and make it performant
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

// @desc- fetch the single blog --- not working
blogRouter.get("/blog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  try {
    const id = c.req.param("id");
    const token = c.get("userToken");
    console.log(c.req.param);
    const blog = await prisma.blogs.findUnique({
      where: { id: id },
    });

    if (!blog) {
      c.status(404);
      return c.json({ message: "unable to fetch the blog" });
    }

    c.status(200);
    return c.json({ message: c.req.param });
  } catch (err) {
    c.status(500);
    return c.json({ message: "something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
});

// @desc - owner blogs get route
blogRouter.get("/my/blogs", protectedRoute, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  try {
    const token = c.get("userToken");

    const userBlogs = await prisma.blogs.findMany({
      where: {
        // @ts-ignore
        userId: token.id,
      },
    });

    if (!userBlogs) {
      c.status(404);
      return c.json({ message: "unable to find your blogs!" });
    }

    c.status(200);
    return c.json({ message: userBlogs });
  } catch (err) {
    console.log(err);
    c.status(500);
    return c.json({ message: "something went wrong!" });
  } finally {
    await prisma.$disconnect();
  }
});

// think about this route for now!
blogRouter.get("/my/blogs/:id", async (c) => {});

//	@desc - new blog route with post route
blogRouter.post("/new", protectedRoute, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });
  try {
    const token = c.get("userToken");
    const { title, metaDesc, content } = await c.req.json();

    const blog = await prisma.blogs.create({
      data: {
        title: title,
        metaDesc: metaDesc,
        content: content,
        // @ts-ignore
        userId: token?.id,
      },
    });

    if (!blog) {
      c.status(500);
      return c.json({ message: "unable to create blog!" });
    }

    c.status(201);
    return c.json({ message: "blog created!" });
  } catch (err) {
    console.log(err);
    c.status(500);
    return c.json({ message: "unable to create new blog!" });
  }
});

export default blogRouter;
