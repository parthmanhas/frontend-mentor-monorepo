import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedbackWithTags } from '@/lib/types';
import { Tag } from '@prisma/client';

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
                <Button variant="outline">Upvotes {feedback.upvotes}</Button>
                <Button variant="outline">Comments 2</Button>
            </CardFooter>
        </Card>
    )
}