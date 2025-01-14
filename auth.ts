import { loginWithCredentials } from "@/lib/api/account";
import { MVUser } from "@/lib/types/misc";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: AdapterUser & MVUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<MVUser | null> => {
        let user = null;
        user = await loginWithCredentials(
          credentials.email as string,
          credentials.password as string
        );
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      // Add custom user data to session object
      if (token.user) {
        session.user = token.user as AdapterUser & MVUser; // Ensure user in session is AdapterUser & MVUser
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
