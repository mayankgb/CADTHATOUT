import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            image?: string;
            jwtToken: string;
            role: string;
            appVersion: string
        };
    }
    interface User {   
        id: string;
        email: string;
        image?: string;
        jwtToken: string;
        role: string;
    }

}