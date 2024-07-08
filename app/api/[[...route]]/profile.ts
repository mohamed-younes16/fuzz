import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import prismadb from "@/lib/prismabd";
import getCurrentUser from "@/actions";
import { ProfileSchema } from "@/models/Schemas/Setup";




const profile = new Hono()
  .post("/patch", zValidator("json", ProfileSchema), async (c) => {
  
    const data = c.req.valid("json");
    if (!data) {
      return c.json(
        { message: "Missing a required fields: name or username, bio, imageUrl" },
        { status: 400 }
      );
    }
    try {
      const user = await getCurrentUser();
      user &&
        (await prismadb.user.upsert({
          create: { id: user.id, ...data, onboarded: true },
          update: { id: user.id, ...data, onboarded: true },
          where: { id: user.id },
        }));

      return c.json({ message: "your profile is ready" }, { status: 201 });
    } catch (error) {
      console.log(error, "##########user create ###############");
      return c.json({ message: "error in server" }, { status: 500 });
    }
  })
  .get("/", async (c) => {
    const user = await getCurrentUser();
    console.log(user)
    return c.json({ user }, { status: 200 });
  });

export default profile;
