import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { comparePassword, hashPassword } from "./utils";

type Bindings = {
  DATABASE_URL: string;
  JWT_TOKEN: string;
  COOKIE_STRING: string
};

type Variables = {
  token: string;
};

const authRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

authRouter.post("/login", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { email, password } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        email: true,
        password: true,
        fullName: true,
        country: true,
      },
    });

    const isValidPassword: boolean = comparePassword(
      password,
      user?.password || ""
    );

    if (!isValidPassword) {
      c.status(403);
      return c.json({ message: "invalid credentials!" });
    }

    const jwtPayload = {
      email: email,
      fullName: user?.fullName,
      counrty: user?.country,
      role: "User",
    };
    // store this token
    const token = await sign(jwtPayload, c.env.JWT_TOKEN);

    const cookieName = "techttales_jwt";
    const maxAge = 60 * 60 * 24; // 1 day in seconds

    // // add the c.header('Set-Cookie', `${cookieName}=${cookieValue}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`);
    // // from there - https://chatgpt.com/c/9e42656d-94cd-496a-888c-e490b1b5165b
    // c.header(
    //   c.env.COOKIE_STRING,
    //   `${cookieName}=${token}; Max-Age=${maxAge}; HttpOnly; Secure;`
    // );
    // // c.header("Set-Cookie", cookie);

    c.header('Authorization', `Bearer ${token}`)

    c.status(200);
    return c.json({ message: "this is login router", token });
  } catch (err) {
    console.log(err);
    c.status(500);
    return c.json({ message: "internal server error!" });
  }
});

authRouter.post("/register", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { email, password, fullName, country, dob, gender } =
      await c.req.json();

    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      c.status(400);
      return c.json({ message: "User already exists!" });
    }

    const hashedPassword = hashPassword(password);

    // Convert dob to Date object and format it to YYYY-MM-DD
    const dateOfBirth = new Date(dob);
    const formattedDob = dateOfBirth.toISOString().split("T")[0];

    const jwtPayload = {
      email: email,
      fullName: fullName,
      counrty: country,
      role: "User",
    };
    const token = await sign(jwtPayload, c.env.JWT_TOKEN);
    console.log(token);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        fullName: fullName,
        country: country,
        dob: formattedDob,
        gender: gender,
      },
    });

    if (!user) {
      c.status(500);
      return c.json({ message: "internal server error!" });
    }

    // navigate user to login first
    c.status(201);
    return c.json({ message: "this is register router", token });
  } catch (err) {
    console.log(err);
    c.status(500);
    return c.json({
      message: "something bad happened! please try again later :)",
    });
  } finally {
    await prisma.$disconnect();
  }
});

export default authRouter;
