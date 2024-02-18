import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Are you sure that's an email?" })
    .email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmationCode: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Are you sure that's an email?" })
    .email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Passwords should be at least 6 characters" }),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Are you sure that's an email?" })
    .email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required", invalid_type_error: "Are you sure that's an email?" })
    .min(6, { message: "Passwords should be at least 6 characters" }),
});
