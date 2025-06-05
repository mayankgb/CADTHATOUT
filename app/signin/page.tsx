"use client"


import { Suspense } from "react"
import SignInPage from "../_components/signin/SignInPage"


export default function SignIn() {
    return (
        <Suspense>
            <SignInPage />
        </Suspense>
    )
}