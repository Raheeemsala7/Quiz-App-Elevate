import Credentials from "next-auth/providers/credentials";
import { IAuthResponse } from "./lib/types/auth";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
                token: {},
                user: {}
            },
            authorize: async (credentials) => {

                // if (credentials?.token && credentials?.user) {
                //     const user = JSON.parse(credentials.user)
                //     return {
                //         id: user.id,
                //         token: credentials.token,
                //         user
                //     }
                // }

                const res = await fetch(`${process.env.API_URL}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify({ username: credentials?.username, password: credentials?.password }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const data: IApiResponse<IAuthResponse> = await res.json()

                if (!data.status) {
                    throw Error(data.message)
                }

                const loginData = data.payload

                return {
                    id: loginData.user.id,
                    token: loginData.token,
                    user: loginData.user
                }


            }
        })
    ],

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.token = user.token
                token.user = user.user
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user

            return session
        }
    }
}