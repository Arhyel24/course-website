import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";
import connectToDb from "./connectDataBase";
import User from "@/app/models/userModel";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    //   async profile(profile) {
    //     return {
    //       id: profile.sub,
    //       username: profile.sub,
    //       email: profile.email,
    //     };
    //   },
    //   httpOptions: {
    //     timeout: 10000,
    //   },
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectToDb();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error occurred in auth", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 60 * 60,
    updateAge: 1 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      await connectToDb();
      const email = session?.user?.email;
      const dbUser = await User.findOne({ email });

      session.user.name = dbUser.username || "undefined";
      session.user.image = dbUser.image || "";

      return session;
    },
  },
};

export default authOptions;
