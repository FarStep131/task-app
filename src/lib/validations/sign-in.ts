import * as z from "zod";

export const SignInValidator = z.object({
  email: z.string().email({
    message: "正しいメールアドレスを入力してください",
  }),
  password: z.string().min(1, { message: "パスワードを入力してください" }),
});
