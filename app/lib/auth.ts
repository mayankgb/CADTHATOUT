

import {prisma} from "@/client";
import { Account, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import jwt from "jsonwebtoken"


export const authOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
        async signIn({ user, account }: { user: User | null, account: Account | null }) {
            if (account?.provider === 'google') {
                if (!user) {
                    console.log("user is not present")
                    return false
                } else {
                    try {
                        const existingUser = await prisma.user.findUnique({
                            where: {
                                email: user.email
                            },
                            select: {
                                id: true,
                                role: true
                           }
                        })
                        if (!existingUser) {
                            const newUser = await prisma.user.create({
                                data: {
                                    email: user.email,
                                },
                                select: {
                                    id: true,
                                }
                            })
                            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET ||"sec3rt")
                            console.log("this is shte suerrrrrrr", token)
                            user.jwtToken = token
                            user.role = "USER"
                            user.id = newUser.id
                        } else {
                            const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!)
                            console.log("this is the userrrrrrrrrr", token)
                            user.role = existingUser.role
                            user.id = existingUser.id
                            user.jwtToken = token
                        }
                        return true
                    } catch (e) {
                        console.log(e)
                        return false

                    }



                }
            } else {
                return false
            }
        },
        jwt: async ({ token, user, trigger, session }: { token: JWT, user: User, trigger?: "signIn" | "signUp" | "update", session?: any }) => {
 
            if (user) {
                token.role = user.role
                token.id = user.id
                token.jwtToken = user.jwtToken
                // console.log(process.env.APP_VERSION)
                token.appVersion = process.env.NEXT_PUBLIC_APP_VERSION

            }
            

            return token
        },
        session: async ({ session, token }: { session: Session, token: JWT }) => {
            // console.log("this run many times")

            const newSession = session as Session
            newSession.user.jwtToken = token.jwtToken as string
            newSession.user.role = token.role as string
            newSession.user.id = token.id as string
            newSession.user.appVersion = "adas" as string
            return newSession

        }
    },
    pages: {
        signIn: "/signin",
    },

    cookies: {
        sessionToken: {
          name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
          },
        },
      },
      session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 60 * 60 * 24 * 3,
      },
      
}
