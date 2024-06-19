import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from './lib/server';
import { loginInSchema } from './lib/schema';
import type { NextAuthConfig } from 'next-auth';

const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
        signOut: '/login'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedCredentials = loginInSchema.safeParse(credentials);

                if (!validatedCredentials.success) {
                    console.log(validatedCredentials.error.message);
                    return null;
                }

                const { email, password } = validatedCredentials.data;

                const user = await getUser({ email, password });
                if (!user) {
                    throw new Error("User not found.");
                }

                const bcrypt = require('bcrypt');
                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;

                return null;
            },
        }),
    ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export default auth;
