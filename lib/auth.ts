import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 120,
  },
  events: {
    async signIn(message) {
      console.log(message);
    },
    async session(message) {
      console.log(message);
    },

    async signOut(message) {
      console.log(message);
    },
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "email and password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();
        console.log(user);
        if (res.ok && user) {
          return {
            id:user.userId,
            name:user.username,
            email:user.email,
          };
        }
        return null;
      },
      
    }),
  ],
  callbacks:{
    session: ({session,token})=>{
      console.log('Session Callback',{session,token});
      return {
        ...session,
        user:{

          ...session.user,
          id:token.id
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  }
};
