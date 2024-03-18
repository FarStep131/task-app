import * as z from "zod";
import { UserClient } from "../graphql/clients/user.client";
import { GqlClientFactory } from "../graphql/clients/gql.client";

const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const data = await UserClient.select_user_by_username(
    { username },
    GqlClientFactory.client(process.env.NEXT_PUBLIC_HASURA_GQL_URL as string)
  );

  return data.users.length === 0;
};

export const SignUpValidator = z
  .object({
    username: z
      .string()
      .min(1, { message: "ユーザ名を入力してください" })
      .max(8, { message: "ユーザ名は最大8文字です" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, {
        message: "パスワードは英数字を含む8文字以上である必要があります",
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    confirmPassword: z
      .string()
      .min(8, {
        message: "パスワードは英数字を含む8文字以上である必要があります",
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  })
  .superRefine(async (data, ctx) => {
    if (data.username) {
      const available = await isUsernameAvailable(data.username);
      if (!available) {
        ctx.addIssue({
          path: ["username"],
          code: "custom",
          message: "このユーザ名は既に登録されています",
        });
      }
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "パスワードが一致しません",
      });
    }
  });
