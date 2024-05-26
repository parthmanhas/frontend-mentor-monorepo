"use client";

import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./submit-button";
import { postComment } from "@/lib/server";
import { useToast } from "./ui/use-toast";

export default function AddComment({ className, feedbackId, parentCommentId, userEmail }: { className?: string, feedbackId?: string, parentCommentId?: string, userEmail: string }) {

    const MAX_CHARACTERS = 250;
    const [charactersLeft, setCharactersLeft] = useState(MAX_CHARACTERS);

    const { toast } = useToast();

    const formRef = useRef<HTMLFormElement>(null);

    const clientAction = async (form: FormData) => {
        const result = await postComment(form);
        if (result?.success) {
            toast({ description: result?.message, variant: 'default' });
        } else {
            toast({ description: result?.message, variant: 'destructive' });
        }
        setCharactersLeft(MAX_CHARACTERS);
        formRef?.current?.reset();
    }

    return (
        <form ref={formRef} action={clientAction} className={`p-6 border-[1px] rounded ${className}`}>
            <h2 className="mb-5 font-bold text-black/80">Add Comment</h2>
            {feedbackId && <input name="feedbackId" value={feedbackId} hidden readOnly />}
            {parentCommentId && <input name="parentCommentId" value={parentCommentId} hidden readOnly />}
            <input name="userEmail" value={userEmail} hidden readOnly />
            <Textarea name="content" className="bg-black/5" placeholder="Type your comment here" maxLength={MAX_CHARACTERS} onChange={e => setCharactersLeft(MAX_CHARACTERS - e.target.value.length)} />
            <div className="flex w-full justify-between mt-5">
                <p>{charactersLeft} characters left</p>
                <SubmitButton>Post Comment</SubmitButton>
            </div>
        </form>
    )
}