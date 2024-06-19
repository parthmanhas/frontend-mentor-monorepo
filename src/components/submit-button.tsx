"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ReactNode } from "react";

export default function SubmitButton({ children }: { children: ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending} variant="default">{children}</Button>
    )
}