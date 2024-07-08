import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import prismadb from "@/lib/prismabd";
import bcrypt from "bcryptjs";


const schema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string(),
});

const register = new Hono().post("/", zValidator("json", schema), async (c) => {
  const { email, name, password } = c.req.valid("json");
  try {
    const hashedpassword = await bcrypt.hash(password, 12);

    const userupsert = await prismadb.user.create({
      data: { email, hashedpassword, name },
    });
    return c.json(
      { message: "User created is ready", userupsert },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########user create ###############");
    return c.json({ message: "error in server" }, { status: 500 });
  }
  
});

export default register;
