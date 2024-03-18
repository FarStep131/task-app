"use client";

import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SignInValidator } from "@/lib/validations/sign-in";

type SignInPresenterProps = {
  form: UseFormReturn<z.infer<typeof SignInValidator>>;
  isLoading: boolean;
  onSubmit: (data: z.infer<typeof SignInValidator>) => void;
};

export const SignInPresenter = ({
  form,
  isLoading,
  onSubmit,
}: SignInPresenterProps) => (
  <>
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <CheckIcon className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-5xl space-y-4 py-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="text"
                    autoCapitalize="off"
                  />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    inputMode="text"
                    autoCapitalize="off"
                  />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="space-y-2 w-full"
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            ログイン
          </Button>
        </form>
      </Form>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/sign_up"
          className="hover:text-brand underline underline-offset-4"
        >
          アカウントを持っていない方はこちら
        </Link>
      </p>
    </div>
  </>
);
