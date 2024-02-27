import { UserRole } from "@prisma/client";
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

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && data!.newPassword) {
        return false;
      }
      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "Current password is required", path: ["password"] }
  );
