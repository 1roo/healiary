// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      nickname: string;
      email: string;
    };
  }

  interface User {
    id: number;
    nickname: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    nickname: string;
    email: string;
  }
}
