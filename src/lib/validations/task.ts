import * as z from "zod";

export const createTaskFormValidator = z.object({
  title: z
    .string({ required_error: "タイトルを入力してください" })
    .max(30, { message: "タイトルは最大 30 文字です" }),
  status: z.string({ required_error: "ステータスを選択してください" }),
  priority: z.string({ required_error: "優先度を選択してください" }),
  user_id: z.string(),
});

export const updateTaskFormValidator = z.object({
  id: z.number(),
  title: z
    .string({ required_error: "タイトルを入力してください" })
    .max(30, { message: "タイトルは最大 30 文字です" }),
  status: z.string({ required_error: "ステータスを選択してください" }),
  priority: z.string({ required_error: "優先度を選択してください" }),
});

export const taskValidator = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
});
