export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!sign_in|sign_up).*)"],
};
