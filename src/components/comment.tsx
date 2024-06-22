"use client";

import { useState } from "react";
import PostReply from "./post-reply";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IoIosInformationCircleOutline } from "react-icons/io";

type CommentProps = {
    className?: string,
    id: string,
    userEmail: string,
    username?: string,
    content: string,
    children?: CommentProps[],
    updatedAt: Date,
    parentFeedbackId: string
}

export default function Comment({ className, userEmail, username, content, children, id, updatedAt, parentFeedbackId }: CommentProps) {

    const [replying, setReplying] = useState(false);

    return (
        <>
            <div className={`flex flex-col w-full gap-8 mb-5 py-5 pl-5 ${className}`}>
                <div className="flex gap-8">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold">{userEmail}</p>
                                <p className="text-black/50">{username}</p>
                            </div>
                            <div className="flex h-full space-x-2 items-start">

                                <Button className="ml-auto" onClick={() => setReplying(!replying)}>{replying ? 'Cancel Reply' : 'Reply'}</Button>
                                <Popover>
                                    <PopoverTrigger><IoIosInformationCircleOutline /></PopoverTrigger>
                                    <PopoverContent>
                                        <small>Last Updated At: {updatedAt.toLocaleString()}</small>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <p className="text-black/70">{content}</p>
                        {replying &&
                            <PostReply
                                setReplying={setReplying}
                                parentCommentId={id}
                                parentFeedbackId={parentFeedbackId}
                            />
                        }
                    </div>
                </div>
                <div className="ml-8 border-l-[1px]">
                    {children?.map((childComment, index) => <Comment key={index} {...childComment} />)}
                </div>
            </div>

        </>
    )
}