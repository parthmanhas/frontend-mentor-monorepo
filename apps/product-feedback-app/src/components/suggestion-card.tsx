import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
export default function SuggestionCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add tags for solution</CardTitle>
                <CardDescription>Easier to search for solution based on a specific task</CardDescription>
            </CardHeader>
            <CardContent>
                <Badge variant="secondary">Enhancement</Badge>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Upvotes 112</Button>
                <Button variant="outline">Comments 2</Button>
            </CardFooter>
        </Card>
    )
}