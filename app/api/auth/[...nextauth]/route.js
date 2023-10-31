import ConnectDB from "@/libs/db";
import User from "@/model/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credential: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await ConnectDB();
          const user = await User.findOne({ email });
          // console.log(user);
          if (!user) {
            return null;
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
