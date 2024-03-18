"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SignUpValidator } from "@/lib/validations/sign-up";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { insertUsersOne } from "@/actions/user";
import { SignUpPresenter } from "./SignUpPresenter";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof SignUpValidator>>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  type FormData = z.infer<typeof SignUpValidator>;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const { errors } = await insertUsersOne({
        id: userCredential.user.uid,
        email: data.email,
        username: data.username,
      });
      if (errors && errors.length > 0) {
        toast({
          title: "新規登録に失敗しました",
          variant: "destructive",
        });
        return;
      }
      await signIn("credentials", {
        email: userCredential.user.email,
        redirect: true,
        callbackUrl: "/",
      });
      toast({
        title: "新規登録に成功しました",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast({
            title: "このメールアドレスは使用できません",
            variant: "destructive",
          });
          return;
        }
      }
      toast({
        title: "新規登録に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SignUpPresenter form={form} isLoading={isLoading} onSubmit={onSubmit} />
  );
};
