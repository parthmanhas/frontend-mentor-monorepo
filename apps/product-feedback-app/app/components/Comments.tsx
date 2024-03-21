'use client';

import Comment from "@/app/components/Comment";
import { IComment } from "../interfaces/interface";
import { useState } from "react";

export default function Comments() {

    const comments: IComment[] = [{
        id: 'Asdndhf',
        parent: '',
        username: 'Elijah Moss',
        userId: '@hexagon.bestagon',
        commentString: 'Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.',
        comments: [{
            id: 'Asdndhf',
            parent: '',
            username: 'Elijah Moss',
            userId: '@hexagon.bestagon',
            commentString: 'Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.'
        }]
    }];

    const [commentState, setCommentState] = useState(comments);

    return <div className="text-east-bay-900 bg-white rounded mt-4 p-4">
        <h2>4 Comments</h2>
        {comments.map((comment, index) => <Comment comment={comment} key={index} />)}

    </div>
}