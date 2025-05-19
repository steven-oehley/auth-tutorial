import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(5, "Name is required"),
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .refine(
        (val) => {
          // This regex requires:
          // - At least one lowercase letter (automatically present in most passwords)
          // - At least one uppercase letter
          // - At least one number OR one special character
          // - Minimum 6 characters total
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(
            val
          );
        },
        {
          message:
            "Password must include at least one uppercase letter and one number or special character",
        }
      ),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
