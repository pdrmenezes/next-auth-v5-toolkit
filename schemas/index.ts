import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Are you sure that's an email?" })
    .email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Are you sure that's an email?" })
    .email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password should be at least 6 characters" }),
});
