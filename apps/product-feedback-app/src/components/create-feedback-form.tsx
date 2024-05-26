"use client";

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from './submit-button';
import { useToast } from './ui/use-toast';
import { createFeedback } from '@/lib/server';
import CategoryInput from './category-input';

export default function CreateFeedbackForm({ categories }: { categories: { name: string }[] }) {

    const { toast } = useToast();

    async function clientAction(form: FormData) {
        const result = await createFeedback(form);
        if (result?.success) {
            toast({ description: result?.message, variant: 'default' });
        } else {
            toast({ description: result?.message, variant: 'destructive' });
        }
    }

    return (
        <form className="mb-auto w-full" action={clientAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Create new feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Feedback Title</Label>
                            <small className="text-black/40">Add a short, descriptive headline</small>
                            <Input id="title" required name="heading" />
                        </div>
                        <CategoryInput categories={categories} />
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="content">Feedback Detail</Label>
                            <small className="text-black/40">Include any specific comments on what should be improved, added, etc.</small>
                            <Textarea id="content" required name="content" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <SubmitButton>Submit</SubmitButton>
                </CardFooter>
            </Card>
        </form>
    )
}