import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedbackWithTagsAndCommentsCount } from '@/lib/types';
import { Tag } from '@prisma/client';
import SuggestionCardUpvoteButton from './suggestion-card-upvote-button';
import { updateUpvote } from '@/lib/server';

type SuggestionCardProps = {
    feedback: FeedbackWithTagsAndCommentsCount,
    className?: string,
    displayTags?: boolean
}

export default function SuggestionCard({ feedback, className, displayTags = false }: SuggestionCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{feedback.heading}</CardTitle>
                <CardDescription>{feedback.content}</CardDescription>
            </CardHeader>
            {displayTags && <CardContent className="space-x-2">
                {feedback.tags.map((tag: Tag, index) => <Badge key={index} variant="secondary">{tag.name}</Badge>)}
            </CardContent>}
            <CardFooter className="flex justify-end space-x-4">
                <SuggestionCardUpvoteButton feedbackId={feedback.id} updateUpvote={updateUpvote} upvotes={feedback.upvotes} />
                <Button variant="outline">Comments {feedback?.totalComments}</Button>
                <p>{feedback?.status.charAt(0) + feedback?.status.toLowerCase().slice(1)}</p>
            </CardFooter>
        </Card>
    )
}