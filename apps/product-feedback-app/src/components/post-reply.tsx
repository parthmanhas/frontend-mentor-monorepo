import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';
import { postComment } from '@/lib/server';
import { useToast } from './ui/use-toast';

export default function PostReply({ parentCommentId, userEmail, setReplying, parentFeedbackId }: { parentCommentId: string, userEmail: string, setReplying: Function, parentFeedbackId: string }) {

    const formRef = useRef<HTMLFormElement>(null);

    const { toast } = useToast();

    const clientAction = async (form: FormData) => {
        const result = await postComment(form);
        if (result?.success) {
            toast({ description: result?.message, variant: 'default' });
        } else {
            toast({ description: result?.message, variant: 'destructive' });
        }
        formRef?.current?.reset();
        setReplying(false);
    }
    return (
        <form ref={formRef} action={clientAction} className="w-full flex justify-between my-5 gap-4">
            <input name="parentCommentId" value={parentCommentId} hidden readOnly />
            <input name="feedbackId" value={parentFeedbackId} hidden readOnly />
            {/* TODO: fix userEmail when setting up authentication */}
            <input name="userEmail" value="getUserNameFromContext@goog.com" hidden readOnly />
            <Textarea maxLength={250} name="content" />
            <Button>Post Reply</Button>
        </form>
    )
}