import { useState } from "react";
import Button from "./Button";

export default function PostReply({ addComment, className }: { addComment: any, className?: string }) {
    const [reply, setReply] = useState('');
    return <div className="w-full flex justify-between">
        <textarea value={reply} onChange={e => setReply(e.target.value)} className="grow mr-3 p-4 text-md bg-white-lilac-50 outline-royal-blue-500"></textarea>
        <Button onClick={() => addComment(reply)} className="w-fit h-fit text-white semibold">Post Reply</Button>
    </div>
}