import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "must be at least 4 characters long" })
      .max(16),
    email: z.string().min(4).email(),
    password: z
      .string()
      .min(4, { message: "must be at least 8 characters long" })
      .max(14),
    confirm: z
      .string()
      .min(4, { message: "must be at least 8 characters long" })
      .max(14),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const transactionSchema = z.object({
  amount: z.number({ required_error: "Amount must be a Provided" }),
  payee: z.string({ required_error: "Payee is required" }).min(1),
  notes: z.string().default(""),
  accountId: z
    .string({ required_error: "Account reference is required" })
    .min(1),
  categoryId: z.string().nullable().default(""),
  category: z.string().nullable().default(""),
  createdAt: z.string().nullable().default(""),
});
export const Loginschema = z.object({
  email: z.string().min(4).email(),
  password: z
    .string()
    .min(4, { message: "must be at least 8 characters long" })
    .max(24),
});
export const ProfileSchema = z.object({
  name: z.string().min(1).default(""),
  username: z.string().min(1).default(""),
  bio: z.string().min(1).default(""),
  imageUrl: z.string().min(1).default(""),
});
export const AccountSchema = z.object({
  name: z.string().max(15),
});
export const CategorySchema = z.object({
  name: z.string().max(15),
});
