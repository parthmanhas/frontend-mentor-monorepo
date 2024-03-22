import { Dispatch, SetStateAction, useState } from "react";
import Button from "./Button";
import { IComment } from "../interfaces/interface";

export default function PostReply({ rootComments, setRootComments, className, parentDetails, path }: { rootComments: IComment[], setRootComments: Dispatch<SetStateAction<IComment[]>>, className?: string, parentDetails: Pick<IComment, 'id'>, path: string }) {

    const postReply = () => {
        const newComment: IComment = {
            id: 'new-id' + new Date(),
            parent: parentDetails.id,
            userId: 'current-user-id',
            username: 'current-user-name',
            commentString: reply
        }
        // updateComment(rootComments, path, newComment, setRootComments);
    }

    // const updateComment = (comments: IComment[], path: string, newComment: IComment, setRootComments: Dispatch<SetStateAction<IComment[]>>) => {
    //     const keys = path.split('.');
        
    //     for(let key of keys) {
    //         comments = comments[key];
    //     }

    //     comments['comments'] = [newComment];
    //     setRootComments(comments)

    // }

    const [reply, setReply] = useState('');
    return <div className="w-full flex justify-between">
        <textarea value={reply} onChange={e => setReply(e.target.value)} className="grow mr-3 p-4 text-md bg-white-lilac-50 outline-royal-blue-500"></textarea>
        <Button onClick={postReply} className="w-fit h-fit text-white semibold">Post Reply</Button>
    </div>
}