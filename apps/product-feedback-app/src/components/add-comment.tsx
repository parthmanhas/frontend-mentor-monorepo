"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function AddComment({ className }: { className?: string }) {

    const [charactersLeft, setCharactersLeft] = useState(250);

    return (
        <div className={`p-6 border-[1px] rounded ${className}`}>
            <h2 className="mb-5 font-bold text-black/80">Add Comment</h2>
            <Textarea className="bg-black/5" placeholder="Type your comment here" maxLength={250} onChange={e => setCharactersLeft(charactersLeft - e.target.value.length)} />
            <div className="flex w-full justify-between mt-5">
                <p>{charactersLeft} characters left</p>
                <Button>Post Comment</Button>
            </div>
        </div>
    )
}