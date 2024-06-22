'use client';

import { signOut } from "next-auth/react"
import { Button } from "./ui/button";

export function SignOut() {
    return <Button className="block" onClick={() => signOut()}>Signout</Button>
}