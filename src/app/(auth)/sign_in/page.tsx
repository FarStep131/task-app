import { Metadata } from "next";
import { SignIn } from "./_components/SignIn";

export const metadata: Metadata = {
  title: "ログイン",
  description: "アカウントにログイン",
};

export default function SignInPage() {
  return <SignIn />;
}
