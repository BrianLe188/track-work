import { ISignIn } from "@/lib/type/auth";
import { z } from "zod";

export const signInDefaultValues: ISignIn = {
  email: "",
  password: "",
};

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;
