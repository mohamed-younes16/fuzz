import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import prismadb from "@/lib/prismabd";
import getCurrentUser from "@/actions";
import * as z from "zod";
import { parse, subDays } from "date-fns";
import { transactionSchema } from "@/models/Schemas/Setup";
type CategoryRef = {
  categoryRef?: {
    connect?: { id: string; ownerId: string };
    create?: { name: string; ownerId: string };
  };
};
type TransactionData = {
  accountRef: { connect: { id: string; ownerId: string } };
  amount: number;
  payee: string;
  notes: string;
  categoryRef?: {
    connect?: { id: string; ownerId: string };
    create?: { name: string; ownerId: string };
  };
  createdAt?: string;
};

const transactions = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        from: z.string(),
        to: z.string(),
        accountId: z.string(),
      })
    ),
    async (c) => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          return c.json({ message: "Unauthorized _______________" }, 401);
        }
        const { from, to, accountId } = c.req.valid("query");
        const accountRef = !!accountId
          ? { ownerId: user.id, id: accountId }
          : { ownerId: user.id };
        const defTo = new Date();
        const defFrom = subDays(new Date(), 30);
        const start = from ? parse(from, "yyyy-MM-dd", new Date()) : defFrom;
        const end = to ? parse(to, "yyyy-MM-dd", new Date()) : defTo;

        const transactions = await prismadb.transaction.findMany({
          where: {
            accountRef,
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            createdAt: true,
            id: true,
            categoryRef: {
              select: {
                id: true,
                name: true,
              },
            },
            accountRef: {
              select: {
                id: true,
                name: true,
              },
            },
            amount: true,
            notes: true,
            payee: true,
          },
        });

        return c.json({ transactions }, 200);
      } catch (error) {
        console.log(
          error,
          "##########finance transactions get ###############"
        );
        return c.json({ error: "error in server" }, 500);
      }
    }
  )
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
        const transaction = await prismadb.transaction.findFirst({
          where: { id, accountRef: { ownerId: user?.id } },
          select: {
            createdAt: true,
            id: true,
            categoryRef: {
              select: {
                id: true,
                name: true,
              },
            },
            accountRef: {
              select: {
                id: true,
                name: true,
              },
            },
            amount: true,
            notes: true,
            payee: true,
          },
        });

        return c.json({ transaction }, 200);
      } catch (error) {
        console.log(error, "##########finance transaction get ###############");
        return c.json({ error: "error in server" }, 500);
      }
    }
  )
  .post(
    "/patch",
    zValidator(
      "json",
      z.intersection(transactionSchema, z.object({ id: z.string() }))
    ),

    async (c) => {
      try {
        const user = await getCurrentUser();
        const values = c.req.valid("json");
        const {
          accountId,
          amount,
          categoryId,
          notes,
          payee,
          id,
          createdAt,
          category,
        } = values;
        if (!values) {
          return c.json({ message: "Missing required fields" }, 401);
        }
        if (!user) {
          return c.json({ message: "Unauthorized _______________" }, 401);
        }

        const categoryRef = categoryId
          ? {
              categoryRef: { connect: { id: categoryId, ownerId: user?.id } },
            }
          : category
          ? {
              categoryRef: { create: { name: category, ownerId: user?.id } },
            }
          : {};

        await prismadb.transaction.update({
          where: { id, accountRef: { ownerId: user.id } },
          data: {
            accountRef: { connect: { id: accountId, ownerId: user?.id } },
            amount,
            payee,
            createdAt: createdAt!,
            notes,
            ...categoryRef,
          },
        });

        return c.json({ message: "patched with success" }, 200);
      } catch (error) {
        console.log(error, "##########finance transaction get ###############");
        return c.json({ message: "error in server" }, 500);
      }
    }
  )
  .post("/", zValidator("json", transactionSchema.array()), async (c) => {
    const values = c.req.valid("json");

    if (!values) {
      return c.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
      const user = await getCurrentUser();
      if (!user) {
        return c.json({ message: "Unauthorized _______________" }, 401);
      }

      // Fetch all existing categories for the user
      const existingCategories = await prismadb.category.findMany({
        where: { ownerId: user.id },
      });

      // Create a map of existing categories for quick lookup
      const categoryMap = new Map(
        existingCategories.map((cat) => [cat.name, cat.id])
      );

      // Process categories creation or connection
      for (const el of values) {
        const { category } = el;

        if (category && !categoryMap.has(category)) {
          // Create the category if it doesn't exist
          const newCategory = await prismadb.category.create({
            data: { name: category, ownerId: user.id },
          });
          categoryMap.set(category, newCategory.id);
        }
      }

      // Process transaction data using categoryMap
      const filteredData = values.map((el) => {
        const {
          accountId,
          amount,
          categoryId,
          notes,
          payee,
          category,
          createdAt,
        } = el;
        let categoryRef: CategoryRef = {};

        if (categoryId) {
          categoryRef = {
            categoryRef: { connect: { id: categoryId, ownerId: user.id } },
          };
        } else if (category) {
          // Use the category from categoryMap
          categoryRef = {
            categoryRef: {
              connect: { id: categoryMap.get(category)!, ownerId: user.id },
            },
          };
        }

        let obj: TransactionData = {
          accountRef: { connect: { id: accountId, ownerId: user.id } },
          amount,
          payee,
          notes,
          ...categoryRef,
        };

        if (createdAt) {
          obj.createdAt = createdAt;
        }

        return obj;
      });
      for (const e of filteredData) {
        await prismadb.transaction.create({
          data: e,
          include: { categoryRef: true },
        });
      }

      return c.json(
        { message: "Your new finance transactions are ready" },
        200
      );
    } catch (error) {
      console.log(
        error,
        "##########finance transaction create ###############"
      );
      return c.json({ message: "Error in server" }, 500);
    }
  })
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
          (await prismadb.transaction.deleteMany({
            where: { id: { in: Ids }, accountRef: { ownerId: user.id } },
          }));

        return c.json(
          {
            message: `${Ids.length} of selected finance transactions has been deleted successfully`,
          },
          { status: 201 }
        );
      } catch (error) {
        console.log(
          error,
          "##########Finance transaction Delete ###############"
        );
        return c.json({ message: "error in server while deleteing" }, 500);
      }
    }
  );

export default transactions;
