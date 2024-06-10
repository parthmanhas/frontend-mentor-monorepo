import Comment from "./comment";
import { Comment as IComment } from '@prisma/client';

export default async function Comments({ comments, parentFeedbackId, totalComments }: { comments: IComment[], parentFeedbackId: string, totalComments: number }) {

    return (
        <div className="my-5 border-[1px] rounded border-black/10 p-5">
            <p className="font-semibold">{totalComments} Comments</p>
            {comments.map(
                (comment, index) =>
                    <Comment className={index !== comments.length - 1 ? `border-b-[1px]` : ''}
                        key={index}
                        {...comment}
                        parentFeedbackId={parentFeedbackId}
                    />
            )}
        </div>
    )
}