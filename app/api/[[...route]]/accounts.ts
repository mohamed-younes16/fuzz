import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import prismadb from "@/lib/prismabd";
import getCurrentUser from "@/actions";
import * as z from "zod";

const accounts = new Hono()
  .get("/", async (c) => {
    try {
      const user = await getCurrentUser();
      const accounts = await prismadb.financeAccount.findMany({
        where: { ownerId: user!.id },
        orderBy: { createdAt: "desc" },
        select: { name: true, createdAt: true, id: true },
      });

      return c.json({ accounts }, 200);
    } catch (error) {
      console.log(error, "##########finance accounts get ###############");
      return c.json({ error: "error in server" }, 500);
    }
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),

    async (c) => {
      try {
        const user = await getCurrentUser();
        const { id } = c.req.valid("param");
        if (!id) {
          return c.json({ message: "Missing required fields: Id" }, 401);
        }
        const account = await prismadb.financeAccount.findFirst({
          where: { ownerId: user!.id, id },
          select: { name: true, createdAt: true, id: true },
        });

        return c.json({ account }, 200);
      } catch (error) {
        console.log(error, "##########finance account get ###############");
        return c.json({ error: "error in server" }, 500);
      }
    }
  )
  .post(
    "/patch",
    zValidator("json", z.object({ name: z.string(), id: z.string() })),

    async (c) => {
      try {
        const user = await getCurrentUser();
        const { name, id } = c.req.valid("json");
        if (!name) {
          return c.json({ message: "Missing required fields: name" }, 401);
        }
        const account = await prismadb.financeAccount.update({
          where: { ownerId: user!.id, id },
          data: { name },
        });

        return c.json({ message:'patched with success' }, 200);
      } catch (error) {
        console.log(error, "##########finance account get ###############");
        return c.json({ message: "error in server" }, 500);
      }
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
      })
    ),
    async (c) => {
      const { name } = c.req.valid("json");
      if (!name) {
        return c.json(
          { message: "Missing required fields: name, username, bio, imageUrl" },
          { status: 400 }
        );
      }
      try {
        const user = await getCurrentUser();

        await prismadb.financeAccount.create({
          data: { name, owner: { connect: { id: user?.id } } },
          select: { name: true },
        });

        return c.json(
          { message: "your new finance account is ready" },
          { status: 201 }
        );
      } catch (error) {
        console.log(error, "##########finance account create ###############");
        return c.json({ message: "error in server" }, 500);
      }
    }
  )
  .post(
    "/delete",
    zValidator(
      "json",
      z.object({
        Ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const { Ids } = c.req.valid("json");
      if (!(Ids.length > 0)) {
        return c.json({ message: "Missing required fields: Ids" }, 400);
      }
      try {
        const user = await getCurrentUser();
        !!user &&
          (await prismadb.financeAccount.deleteMany({
            where: { id: { in: Ids }, ownerId: user.id },
          }));

        return c.json(
          {
            message: `${Ids.length} of selected finance accounts has been deleted successfully`,
          },
          { status: 201 }
        );
      } catch (error) {
        console.log(error, "##########Finance account Delete ###############");
        return c.json({ message: "error in server while deleteing" }, 500);
      }
    }
  );

export default accounts;
