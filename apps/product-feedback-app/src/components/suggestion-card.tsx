import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedbackWithTags } from '@/lib/types';
import { Tag } from '@prisma/client';
import SuggestionCardUpvoteButton from './suggestion-card-upvote-button';
import { updateUpvote } from '@/lib/server';

type SuggestionCardProps = {
    feedback: FeedbackWithTags,
    className?: string
}

export default function SuggestionCard({ feedback, className }: SuggestionCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{feedback.heading}</CardTitle>
                <CardDescription>{feedback.content}</CardDescription>
            </CardHeader>
            <CardContent className="space-x-2">
                {feedback.tags.map((tag: Tag) => <Badge variant="secondary">{tag.name}</Badge>)}
            </CardContent>
            <CardFooter className="flex justify-between">
                <SuggestionCardUpvoteButton feedbackId={feedback.id} updateUpvote={updateUpvote} upvotes={feedback.upvotes} />
                <Button variant="outline">Comments 2</Button>
            </CardFooter>
        </Card>
    )
}