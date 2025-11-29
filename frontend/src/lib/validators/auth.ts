import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(6, "buset nama lu pendek amat bro"),
  password: z.string().min(10),
});

export const registerSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string().min(10, "hadehh"),
});

export type SignInSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
