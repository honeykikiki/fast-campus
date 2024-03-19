import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';

import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from '@/db';

export const authOptions = {
  PrismaAdapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? '',
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/users/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 3 * 24 * 60 * 60, //3 days
    updateAge: 24 * 60 * 60, //24 Hours
  },
};

export default NextAuth(authOptions);
