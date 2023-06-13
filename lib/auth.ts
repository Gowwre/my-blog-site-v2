import { createRequire } from "module";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const graphqlUrl = `http://localhost:3001/graphql`;
const restUrl = "http://localhost:3001/auth/login";
const query = `query($email:String!,$password:String!){
    signIn(
        loginCredentials: {email: $email, password: $password}
    ) {
        email
        userId
        username
    }
}`;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 120,
  },

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
        console.log(
          `The value of credentials is ${credentials?.email} and ${credentials?.password}`,
        );
        const { ...leftover } = credentials;
        console.log(leftover);
        console.log();
        try {
          const res = await fetch(graphqlUrl, {
            method: "POST",
            body: JSON.stringify({
              query,
              variables: {
                email: credentials?.email,
                password: credentials?.password,
              },
            }),
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          });
          const user = await res.json();
          console.log(user);
          if (res.ok && user) {
            return {
              id: user.userId,
              name: user.username,
              email: user.email,
            };
          }
          return null;
        } catch (error) {
          console.log(error);
        }
        return null
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback',{session,token});
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
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
  },
};
