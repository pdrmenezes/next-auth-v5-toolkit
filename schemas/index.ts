import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required", invalid_type_error: "Are you sure that's an email?" })
    .email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
