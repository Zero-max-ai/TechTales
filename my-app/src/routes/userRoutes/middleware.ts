import { Context, Next } from "hono";
import { parseCookie } from "./utils";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// export const protectedRoute = async (c: Context, next: Next) => {
//   try {
//     const bearer = c.req.header(c.env.COOKIE_STRING) || "";
//     const userToken = parseCookie(bearer);
//     const token = await verify(userToken, c.env.JWT_TOKEN);

//     if (!token || undefined || null) {
//       c.status(403);
//       return c.json({ message: "invalid token, please login again!" });
//     }

//     c.set("userToken", token);
//     await next();
//   } catch (err) {
//     console.log("error omitted from middleware", err);
//     c.status(403);
//     return c.json({ message: "token is indentifiable, please login again!" });
//   }
// };

export const protectedRoute = async (c: Context, next: Next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });
  try {
    const authHeader = c.req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      c.status(403);
      return c.json("token not identifiable please login again!");
    }
    const vToken = await verify(token, c.env.JWT_TOKEN);
    if (!vToken) {
      c.status(403);
      return c.json({ message: "token in not correct!" });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: vToken.id, email: vToken.email },
    });

    if (!userExists) {
      c.status(403);
      return c.json({ message: "user not found!" });
    }

    console.log(vToken);
    c.set("userToken", vToken);
    await next();
  } catch (err) {
    console.log("error omitted from middleware", err);
    c.status(403);
    return c.json({
      message: "token is not identifiable, please login again!",
    });
  }
};
