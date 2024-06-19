'use client';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authenticate } from "@/lib/server";
import { ArrowRightIcon, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    return (
        <form action={dispatch} className="w-screen h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder='******' type="password" name="password" required />
                    </div>
                    {errorMessage && (<div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <CircleAlert className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </div>)}
                </CardContent>
                <CardFooter className="flex flex-col">
                    <LoginButton />
                    <Link className="mt-5" href="/register">Don&apos;t have an account? Register here</Link>
                </CardFooter>
            </Card>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" aria-disabled={pending} className="w-full">
            Log In <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

    );
}
