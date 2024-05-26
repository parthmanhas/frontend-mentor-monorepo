import Comment from "./comment";
import { Comment as IComment } from '@prisma/client';

export default function Comments({ comments }: { comments: IComment[] }) {

    const comment = {
        email: 'email',
        username: 'username',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi explicabo libero delectus dicta et eveniet incidunt aspernatur cumque, nihil sunt fugit quam cum repellendus laudantium. Itaque nemo quo incidunt pariatur!',
    }

    const commentWithChildren = {
        ...comment,
        childComments: [
            {
                ...comment,
                childComments: [
                    comment
                ]
            }
        ]
    }

    // const comments = [commentWithChildren, comment, comment, comment, comment]

    return (
        <div className="my-5 border-[1px] rounded border-black/10 p-5">
            <p className="font-semibold">{comments.length} Comments</p>
            {comments.map((comment, index) => <Comment className={index !== comments.length - 1 ? `border-b-[1px]` : ''} key={index} {...comment} />)}
        </div>
    )
}