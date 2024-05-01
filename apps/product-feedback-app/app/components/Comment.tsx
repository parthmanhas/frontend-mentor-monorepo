'use client';

import Button from '@/app/components/Button';
import PostReply from '@/app/components/PostReply';
import { Dispatch, SetStateAction, useState } from 'react';
import { Comment as IComment } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from '../utils/utils';
import Comments from './Comments';

export default function Comment({ content, email, feedbackId, id, parentId, username }: IComment) {

    const { data, isLoading, error } = useSWR(`/api/comments?parentId=${id}`, fetcher);

    const [replying, setReplying] = useState(false);

    if(isLoading) return <div className='h-16 w-full rounded-md bg-gray-200 animate-pulse'></div>

    return <div className={`mt-7 md:border-l-2 md:border-t-2 rounded-[30px]`}>
        {/* <div className='absolute left-0 h-full translate-y-[8%] border-l-2'></div> */}
        <div className='flex'>
            <div className="hidden md:block w-[10%]">
                <div className='h-[50px] w-[50px] rounded-full bg-slate-400'></div>
            </div>
            <div className='md:w-[90%] mt-3'>
                {/* mobile */}
                <div className="flex justify-between md:hidden">
                    <div className='flex'>
                        <div className='h-[50px] w-[50px] rounded-full bg-slate-400 mr-5'></div>
                        <div className="mb-4 self-start">
                            <h3>{email}</h3>
                            <p className="text-waikawa-gray-700">{username}</p>
                        </div>
                    </div>
                    <Button onClick={() => setReplying(!replying)} variant="none"><span className="font-semibold">{replying ? 'Cancel Reply' : 'Reply'}</span></Button>
                </div>
                {/* md above */}
                <div className="hidden md:flex md:justify-between">
                    <div className="mb-4 self-start">
                        <h3>{email}</h3>
                        <p className="text-waikawa-gray-700">{username}</p>
                    </div>
                    <Button onClick={() => setReplying(!replying)} variant="none"><span className="font-semibold">{replying ? 'Cancel Reply' : 'Reply'}</span></Button>
                </div>
                <p className="text-waikawa-gray-700 mb-7">{content}</p>
                {replying && <PostReply />}
            </div>
        </div>
        <Comments comments={data}/>
        {/* {comment.comments && comment.comments.map((comment, index) => <Comment rootComments={rootComments} setRootComments={setRootComments} path={path ? `${path}.comments.${index}` : `${comment.id}`} className={`ml-4`} key={`${index}-${comment.id}`} comment={comment} />)} */}
    </div>
}