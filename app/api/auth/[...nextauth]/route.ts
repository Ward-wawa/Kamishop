import NextAuth, {SessionStrategy} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/userSchema';
import dbConnect from '@/lib/mongodb';
import type {JWT} from "next-auth/jwt";
import type {Session} from "next-auth"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: {label:"name",type:"text"},
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize (credentials)
                :Promise<{ id: string; name: string; email: string } | null> {
                await dbConnect();

                if (!credentials) return null;

                const user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error('Invalid credentials');

                const isValid = await user.comparePassword(credentials.password);
                if (!isValid) throw new Error('Invalid credentials');

                return { id: user?._id.toString(), email: user.email,name:user.name };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        }
    },
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    secret: process.env.AUTH_SECRET,
};

export const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };