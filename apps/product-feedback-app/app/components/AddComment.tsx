import { useState } from "react";
import Button from "./Button";

export default function AddComment({ feedbackId, updateFeedback }: { feedbackId: string, updateFeedback?: Function }) {

    const [data, setData] = useState('');

    const postComment = async () => {
        const body = {
            feedbackId,
            comment: {
                parentId: feedbackId,
                data,
                userId: '4a4336ed-d7ba-4f16-ac81-0b23dde6b69f',
            }
        }
        const options = {
            method: 'PATCH',
            body: JSON.stringify(body)
        };
        const response = await fetch('/api/feedback', options);
        const updatedFeedback = await response.json();
        // updateFeedback(updatedFeedback);

        if (response.ok) {
            setData('');
        } else {
            console.error('Failed to add comment');
        }
    }

    return <div className="w-full p-5 mt-5 rounded-md bg-white">
        <h1 className="text-east-bay-900">Add Comment</h1>
        <textarea value={data} onChange={(e) => setData(e.target.value)} className="w-full bg-white-lilac-50 rounded my-4 h-[100px] outline-royal-blue-500 p-4 text-east-bay-900"></textarea>
        <div className="w-full flex justify-between">
            <p className="text-waikawa-gray-700 items-center">225 characters left</p>
            <Button onClick={postComment} variant="purple">Post Comment</Button>
        </div>
    </div>
}