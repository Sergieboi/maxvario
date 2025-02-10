import { loginWithCredentials } from "@/lib/api/account";
import { MVUser as BaseMVUser } from "@/lib/types/misc";

interface MVUser extends BaseMVUser {
  emailVerified: Date | null;
}
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: MVUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<MVUser | null> => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials.");
        }
        const user = await loginWithCredentials(credentials.email as string, credentials.password as string);
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 6 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as MVUser;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
