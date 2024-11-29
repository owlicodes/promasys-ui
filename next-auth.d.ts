import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    access_token: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      access_token: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    access_token: string;
  }
}
