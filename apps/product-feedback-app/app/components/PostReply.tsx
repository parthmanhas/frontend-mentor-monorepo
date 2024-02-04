import { useState } from "react";
import Button from "./Button";
import { Comment } from "@prisma/client";

interface PostReplyProps {
    data: any,
    mutate: Function,
    parentId: string,
    feedbackId: string,
    username: string,
    email: string,
    setReplying: Function
}

export default function PostReply({ data, mutate, parentId, feedbackId, username, email, setReplying }: PostReplyProps) {
    const postReply = async () => {
        const replyComment = { parentId, feedbackId, content: reply, username, email };
        setLoading(true);
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify(replyComment)
        })
        setReply('');
        setReplying(false);
        setLoading(false);
        mutate([...data, replyComment])
    }

    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState('');

    if (loading) return <p>Loading...</p>

    return <div className="w-full flex justify-between">
        <textarea value={reply} onChange={e => setReply(e.target.value)} className="grow mr-3 p-4 text-md bg-white-lilac-50 outline-royal-blue-500"></textarea>
        <Button onClick={postReply} className="w-fit h-fit text-white semibold">Post Reply</Button>
    </div>
}