'use client';

import Button from '@/app/components/Button';
import PostReply from '@/app/components/PostReply';
import { useState } from 'react';
import { IComment } from '../interfaces/interface';
import clsx from 'clsx';

export default function Comment({ comment, level = 0, className = '' }: { comment: IComment, level?: number, className?: string }) {
    const [replying, setReplying] = useState(false);

    const comments = [];

    // const [comment, setComment] = useState([]);

    return <div className={`mt-7 ${className}`}>
        <div className='flex'>
            <div className="w-[10%]">
                <div className='h-[50px] w-[50px] rounded-full bg-slate-400'></div>
            </div>
            <div className='w-[90%]'>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <h3>{comment.username}</h3>
                        <p className="text-waikawa-gray-700">{comment.userId}</p>
                    </div>
                    <Button onClick={() => setReplying(!replying)} variant="none"><span className="font-semibold">{replying ? 'Cancel Reply' : 'Reply'}</span></Button>
                </div>
                <p className="text-waikawa-gray-700 mb-7">{comment.commentString}</p>
                {/* {replying && <PostReply addComment={setComment} />} */}
            </div>
        </div>
        {comment.comments && comment.comments.map((comment, index) => <Comment className={`ml-${level + 4}`} key={`${index}-${comment.id}`} comment={comment} />)}
    </div>
}