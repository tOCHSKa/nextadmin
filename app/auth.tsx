import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig"
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt"

interface Credentials {
    username: string;
    password: string;
}

const login = async (credentials: Credentials) => {
    try {
        connectToDB()
        const user = await User.findOne({username:credentials.username})
        if(!user) throw new Error("Wrong credentials")

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
    
        if(!isPasswordCorrect) throw new Error("Wrong credentials!")

        return user;

    }catch(err) {
        console.log(err)
        throw new Error("Failed to login")
    }
};
export default NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    if (credentials) {
                        const user = await login(credentials as Credentials);
                        return user;
                    }
                    return null;
                } catch (err) {
                    console.error(err);
                    return null;
                }
            }
        })
    ],
})