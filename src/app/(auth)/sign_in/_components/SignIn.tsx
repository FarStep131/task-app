"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SignInValidator } from "@/lib/validations/sign-in";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { SignInPresenter } from "./SignInPresenter";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof SignInValidator>>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type FormData = z.infer<typeof SignInValidator>;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await signIn("credentials", {
        email: userCredential.user.email,
        redirect: true,
        callbackUrl: "/",
      });
      toast({
        title: "ログインに成功しました",
      });
    } catch (error) {
      console.error("error in click_submit", error);
      toast({
        title: "ログインに失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SignInPresenter form={form} isLoading={isLoading} onSubmit={onSubmit} />
  );
};
