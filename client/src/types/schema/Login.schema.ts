import z from "zod";

const isValidPassword = (password: string) => {
  return (
    /[a-zA-Z]/.test(password) &&
    /\d/.test(password) &&
    !/[^a-zA-Z0-9]/.test(password)
  );
};

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Invalid username",
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((value) => isValidPassword(value), {
      message: "Invalid Password.",
    }),
});
