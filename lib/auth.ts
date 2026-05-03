import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authSchema, getZodErrorMessage } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = authSchema.safeParse(credentials);

        if (!result.success) {
          throw new Error(getZodErrorMessage(result.error));
        }

        const { email, password } = result.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as any;
        token.id = customUser.id;
        token.role = customUser.role;
      }

      if ((!token.id || !token.role) && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, role: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as any;
        sessionUser.id = token.id as string;
        if (token.role) {
          sessionUser.role = token.role as string;
        }
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.id) return;

      await prisma.portfolio.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          title: `${user.name || 'User'}'s Portfolio`,
        },
      });

      await prisma.profile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          profileCompletion: 20,
        },
      });
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import { getServerSession } from 'next-auth/next';

export const getSession = () => getServerSession(authOptions);

export const requireRole = async (requiredRole: string) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  if (user.role !== requiredRole) {
    throw new Error('Forbidden');
  }
  
  return user;
};

export const requireAuth = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
};
