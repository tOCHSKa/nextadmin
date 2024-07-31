import { NextRequest } from "next/server";
import { DefaultSession } from "next-auth";
import { signIn } from "next-auth/react";

interface AuthContext {
    auth: {
        user?: DefaultSession["user"];
    };
    request: NextRequest;
}

export const authConfig = {
    providers: [],
    pages: {
        signIn: "/login"
    },
    callback: {
        authorized({ auth, request }: AuthContext) {
            const isLoggedIn = auth?.user
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", request.nextUrl));
            }
            return true;
        }
    }
}