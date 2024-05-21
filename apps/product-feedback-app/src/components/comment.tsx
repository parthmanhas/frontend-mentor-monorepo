"use client";

import { useState } from "react";
import PostReply from "./post-reply";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

type CommentProps = {
    className?: string,
    email: string,
    username: string,
    content: string,
    childComments?: CommentProps[]
}

export default function Comment({ className, email, username, content, childComments }: CommentProps) {

    const [replying, setReplying] = useState(false);

    return (
        <>
            <div className={`flex flex-col w-full gap-8 mb-5 py-5 pl-5 ${className}`}>
                <div className="flex gap-8">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex justify-between mb-5">
                            <div>
                                <p className="font-bold">{email}</p>
                                <p className="text-black/50">{username}</p>
                            </div>
                            <Button onClick={() => setReplying(!replying)}>{replying ? 'Cancel Reply' : 'Reply'}</Button>
                        </div>
                        <p className="text-black/70">{content}</p>
                        {replying && <PostReply />}
                    </div>
                </div>
                <div className="ml-8 border-l-[1px]">
                    {childComments?.map((childComment, index) => <Comment key={index} {...childComment} />)}
                </div>
            </div>

        </>
    )
}