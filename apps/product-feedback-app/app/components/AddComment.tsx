import { useState } from "react";
import Button from "./Button";
import { Feedback, Comment as IComment } from "@prisma/client";

export default function AddComment({ feedbackId, mutate, email, username, feedback }: { feedbackId: string, mutate: Function, email: string, username: string, feedback: Feedback & { _count: { comments: number }, comments: IComment[] } }) {

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const postComment = async () => {
        setLoading(true);
        const newComment: Partial<IComment> = {
            content,
            feedbackId,
            email,
            parentId: null,
            username
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(newComment)
        };
        const response = await fetch('/api/comment', options);

        if (response.ok) {
            setContent('');
            mutate({ ...feedback, comments: [...feedback.comments, newComment] });
        } else {
            console.error('Failed to add comment');
        }

        setLoading(false);
    }

    if (loading) return <div className="w-full p-5 mt-5 rounded-md bg-white">
        <div className="h-32 w-full bg-gray-200 rounded-md"></div>
    </div>

    return <div className="w-full p-5 mt-5 rounded-md bg-white">
        <h1 className="text-east-bay-900">Add Comment</h1>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-white-lilac-50 rounded my-4 h-[100px] outline-royal-blue-500 p-4 text-east-bay-900"></textarea>
        <div className="w-full flex justify-between">
            <p className="text-waikawa-gray-700 items-center">225 characters left</p>
            <Button onClick={postComment} variant="purple">Post Comment</Button>
        </div>
    </div>
}