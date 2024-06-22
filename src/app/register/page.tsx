'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/lib/server';
import { CircleAlert, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
export default function Register() {
    const [formState, dispatch] = useFormState(register, undefined);

    return (
        <form action={dispatch} className="w-screen h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm m-5">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your details
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" placeholder="Enter you name" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" type="text" placeholder="awesome_me" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder='******' type="password" name="password" required />
                    </div>
                    {formState?.success === false && (<div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <CircleAlert className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{formState.message}</p>
                    </div>)}
                    {formState?.success && (<div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <CircleAlert className="h-5 w-5 text-green-500" />
                        <p className="text-sm text-green-500">{formState.message}</p>
                    </div>)}
                </CardContent>
                <CardFooter className="flex flex-col">
                    <RegisterButton />
                    <Link className="mt-5" href="/login">Already have an account? Login here</Link>
                </CardFooter>
            </Card>
        </form>
    )

}

function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" aria-disabled={pending} className="w-full">
            Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

    );
}
