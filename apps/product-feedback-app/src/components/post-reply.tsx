import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function PostReply() {
    return (
        <div className="w-full flex justify-between my-5 gap-4">
            <Textarea />
            <Button>Post Reply</Button>
        </div>
    )
}