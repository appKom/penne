import { getUserGroups } from '@/lib/auth/getUserGroups';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/admin.directory.group.readonly',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (token.accessToken && user?.email) {
        token.groups = await getUserGroups(
          token.accessToken as string,
          user.email,
        );
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub ? parseInt(token.sub, 10) : 0,
        name: session.user?.name || '',
        role:
          session.user?.email == 'fredrik.carsten.hansteen@online.ntnu.no' ||
          'julian.ottosen@online.ntnu.no '
            ? 'admin'
            : 'user', //TODO vente på dotkom
        email: session.user?.email || '',
        groups: (token.groups as string[]) || [],
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
