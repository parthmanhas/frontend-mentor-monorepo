'use client';

import Button from '@/app/components/Button';
import PostReply from '@/app/components/PostReply';
import { Dispatch, SetStateAction, useState } from 'react';
import { IComment } from '../interfaces/interface';

export default function Comment({ rootComments, comment, className = '', setRootComments, path }: { rootComments: IComment[], comment: IComment, className?: string, setRootComments: Dispatch<SetStateAction<IComment[]>>, path: string }) {
    const [replying, setReplying] = useState(false);

    const comments = [];

    // const [comment, setComment] = useState([]);

    return <div className={`mt-7 ${className} border-l-2 border-t-2 rounded-[30px]`}>
        {/* <div className='absolute left-0 h-full translate-y-[8%] border-l-2'></div> */}
        <div className='flex'>
            <div className="w-[10%]">
                <div className='h-[50px] w-[50px] rounded-full bg-slate-400'></div>
            </div>
            <div className='w-[90%] mt-3'>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <h3>{comment.username}</h3>
                        <p className="text-waikawa-gray-700">{comment.userId}</p>
                    </div>
                    <Button onClick={() => setReplying(!replying)} variant="none"><span className="font-semibold">{replying ? 'Cancel Reply' : 'Reply'}</span></Button>
                </div>
                <p className="text-waikawa-gray-700 mb-7">{comment.commentString}</p>
                {replying && <PostReply parentDetails={comment} rootComments={rootComments} path={path} setRootComments={setRootComments} />}
            </div>
        </div>
        {comment.comments && comment.comments.map((comment, index) => <Comment rootComments={rootComments} setRootComments={setRootComments} path={path ? `${path}.comments.${index}` : `${comment.id}`} className={`ml-4`} key={`${index}-${comment.id}`} comment={comment} />)}
    </div>
}