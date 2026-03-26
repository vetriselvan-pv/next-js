import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import { loginSchema } from "./schema";
import { compare } from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const validatedCredentials = loginSchema.parse(credentials);

        if (credentials.email) {
          user = await prisma.user.findUnique({
            where: {
              email: validatedCredentials.email,
            },
          });
        }
        if (user && user.password) {
          const isValid = await compare(
            validatedCredentials.password,
            user.password,
          );
          if (!isValid) {
            // throw new Error("Invalid credentials"); 
            return null
          }
        }

        if (!user) {
          // throw new Error("User Not credentials."); 
          return null
        }

        return user;
      },
    }),
  ],
  pages: {
    error: "/sign-in",
  },
});
