import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import prismadb from "@/lib/prismabd";
import getCurrentUser from "@/actions";
import * as z from "zod";
import { differenceInDays, parse, subDays } from "date-fns";
import { calculatePercentage, formatMilliunits, formatedPrice } from "@/utils";

const summary = new Hono().get(
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
      const defTo = new Date();
      const defFrom = subDays(new Date(), 30);
      const start = from ? parse(from, "yyyy-MM-dd", new Date()) : defFrom;
      const end = to ? parse(to, "yyyy-MM-dd", new Date()) : defTo;
      const periodLen = differenceInDays(end, start) + 1;
      const lastPeriodStart = subDays(start, periodLen);
      const lastPeriodEnd = subDays(end, periodLen);

      const accountRef = !!accountId
        ? { ownerId: user.id, id: accountId }
        : { ownerId: user.id };
      const fetchFinancialData = async ({
        start,
        end,
      }: {
        start: Date;
        end: Date;
      }) => {
        const incomeSum = await prismadb.transaction.aggregate({
          where: {
            accountRef,
            amount: { gt: 0 },
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            amount: true,
          },
        });
        const expenseSum = await prismadb.transaction.aggregate({
          where: {
            accountRef,
            amount: { lt: 0 },
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            amount: true,
          },
        });
        const income = formatMilliunits(incomeSum._sum.amount || 0);
        const expense = formatMilliunits(expenseSum._sum.amount || 0);
        const total = income + expense;

        return { income, expense, total };
      };

      const currentPeriod = await fetchFinancialData({
        start,
        end,
      });
      const lastPeriod = await fetchFinancialData({
        start: lastPeriodStart,
        end: lastPeriodEnd,
      });
      const incomeChange = calculatePercentage(
        lastPeriod.income,
        currentPeriod.income
      );
      const expenseChange = calculatePercentage(
        lastPeriod.expense,
        currentPeriod.expense
      );
      const totalChange = calculatePercentage(
        lastPeriod.total,
        currentPeriod.total
      );

      const fetchCategorySpending = async (start: Date, end: Date) => {
        const categorySpending = await prismadb.transaction.groupBy({
          by: ["categoryId"],
          where: {
            accountRef,
            amount: { lt: 0 },
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            amount: true,
          },
          orderBy: {
            _sum: {
              amount: "asc",
            },
          },
        });
        const categories = await prismadb.category.findMany({
          where: {
            ownerId: user.id,
            id: {
              in: categorySpending.map((spending) => spending.categoryId!),
            },
          },
          select: {
            id: true,
            name: true,
          },
        });
        return categorySpending.map((spending) => {
          const category = categories.find(
            (cat) => cat.id === spending.categoryId
          );
          return {
            category: category?.name || "Unknown",
            value: formatMilliunits(Math.abs(spending._sum.amount || 0)),
          };
        });
      };
      const spentedOnCategories = await fetchCategorySpending(start, end);
      const topCategories = spentedOnCategories.slice(0, 3);
      const otherCategories = spentedOnCategories.slice(3);
      let finalCategories = topCategories;
      otherCategories.length > 0 &&
        finalCategories.push({
          category: "other",
          value: otherCategories.reduce((prev, cur) => prev + cur.value, 0),
        });

      const fetchDailyIncomeAndExpense = async (start: Date, end: Date) => {
        const incomeByDay = await prismadb.transaction.groupBy({
          by: ["createdAt"],
          where: {
            accountRef,
            amount: { gt: 0 },
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            amount: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const expenseByDay = await prismadb.transaction.groupBy({
          by: ["createdAt"],
          where: {
            accountRef,
            amount: { lt: 0 },
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            amount: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        const dateRange: Date[] = [];

        for (let d = start; d <= end; d = subDays(d, -1)) {
          dateRange.push(d);
        }

        const dailyIncomeAndExpense = dateRange.map((date) => {
          const income = incomeByDay.find(
            (inc) => inc.createdAt.toDateString() === date.toDateString()
          );
          const expense = expenseByDay.find(
            (exp) => exp.createdAt.toDateString() === date.toDateString()
          );

          return {
            date,
            income: formatMilliunits(income?._sum.amount || 0),
            expense: Math.abs(formatMilliunits(expense?._sum.amount || 0)),
          };
        });

        return dailyIncomeAndExpense;
      };

      const daysData = await fetchDailyIncomeAndExpense(start, end);
      return c.json(
        {
          remainingAmount: currentPeriod.total,
          remainingChange: totalChange,
          incomeAmount: currentPeriod.income,
          incomeChange,
          expenseAmount: currentPeriod.expense,
          expenseChange,
          categories: finalCategories,
          days: daysData,
        },
        200
      );
    } catch (error) {
      console.log(error, "##########finance transactions get ###############");
      return c.json({ error: "error in server" }, 500);
    }
  }
);
export default summary;
