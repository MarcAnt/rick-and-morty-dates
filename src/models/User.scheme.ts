import { z } from "zod";

export const UserScheme = z.object({
  name: z.optional(
    z
      .string()
      .max(50, { message: "Must be 5 or fewer characters long" })
      .min(5, { message: "Must be 5 or more characters long" })
  ),
  email: z.string().email({ message: "Invalid email address" }),
});
