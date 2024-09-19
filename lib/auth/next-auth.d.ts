import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: User;
  }

  interface User {
    id: number;
    name: string;
    role?: 'admin' | 'user';
    email: string;
    groups: string[];
  }
}
