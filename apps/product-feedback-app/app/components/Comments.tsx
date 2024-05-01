'use client';

import Comment from "@/app/components/Comment";
import { Comment as IComment } from "@prisma/client";

export default function Comments({ comments }: { comments: IComment[] }) {

    return <div className="text-east-bay-900 bg-white rounded mt-4 p-4">
        {comments?.map((comment, index) => <Comment key={index} {...comment} />)}
    </div>
}