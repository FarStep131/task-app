import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jsonwebtoken from "jsonwebtoken";
import { UserClient } from "./graphql/clients/user.client";
import { GqlClientFactory } from "./graphql/clients/gql.client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        const { email } = credentials;
        if (!email) return null;
        try {
          const response = await UserClient.select_user_by_email(
            { email: email as string },
            GqlClientFactory.client(process.env.HASURA_GQL_URL as string)
          );

          const user = response.users[0];
          if (!user) {
            throw new Error(
              "You can't login with this account. Try a different account."
            );
          }
          return user;
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // NOTE: authorize callback が呼び出されたときに user が存在する
        // authorize callback にてデータベースへのアクセスを行っている
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;

        return token;
      }

      if (!token.email) {
        return token;
      }

      const response = await UserClient.select_user_by_email(
        { email: token.email },
        GqlClientFactory.client(process.env.HASURA_GQL_URL as string)
      );
      const dbUser = response.users[0];
      if (dbUser) {
        token.id = dbUser.id;
        token.email = dbUser.email;
        token.username = dbUser.username;
      }

      return token;
    },
    session: ({ session, token }) => {
      const encodedToken = jsonwebtoken.sign(
        token,
        process.env.NEXTAUTH_SECRET as string,
        {
          algorithm: "HS256",
        }
      );
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.token = encodedToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign_in",
    error: "/sign_in",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
