import { Metadata } from "next";
import { SignUp } from "./_components/SignUp";

export const metadata: Metadata = {
  title: "新規登録",
  description: "アカウントを作成",
};

export default function SignUpPage() {
  return <SignUp />;
}
