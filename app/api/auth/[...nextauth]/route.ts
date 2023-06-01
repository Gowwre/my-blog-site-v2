import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions:NextAuthOptions = {
  session: {
    strategy: "jwt"
  }
  ,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        
      },
      authorize(credentials, req) {
        const {email,password} = credentials as {email:string,password:string};

        if (email !== "email@example.com" || password !== "password123") {
          return null;
        }

        return {
          id: "1",
          name: "John Doe",
          email: "email@example.com",
        }
      }
    })
  ]
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };