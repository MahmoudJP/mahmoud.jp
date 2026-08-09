import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export function studioAllowedEmail() {
  return process.env.STUDIO_ALLOWED_EMAIL?.trim().toLowerCase() ?? "";
}

export function isStudioOwnerEmail(email?: string | null) {
  const allowed = studioAllowedEmail();
  return Boolean(allowed && email && email.trim().toLowerCase() === allowed);
}

export const studioAuthOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  pages: {
    signIn: "/studio/login",
    error: "/studio/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const googleProfile = profile as { email?: string; email_verified?: boolean } | undefined;
      return Boolean(
        account?.provider === "google" &&
          googleProfile?.email_verified !== false &&
          isStudioOwnerEmail(googleProfile?.email),
      );
    },
    async session({ session, token }) {
      if (!isStudioOwnerEmail(token.email)) {
        return { ...session, user: undefined };
      }

      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};
