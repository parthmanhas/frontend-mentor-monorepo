"use client";

import { updateFeedback, createFeedback } from '@/lib/server';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CategoryInput from '@/components/category-input';
import { Feedback } from '@prisma/client';
import { useToast } from './ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import SubmitButton from '@/components/submit-button';
import Link from 'next/link';


export default function EditFeedbackForm({ feedback, categories }: { feedback: Feedback, categories: { name: string }[] }) {
    const { toast } = useToast();

    async function clientAction(form: FormData) {
        const result = await updateFeedback(form);
        if (result?.success) {
            toast({ description: result?.message, variant: 'default' });
        } else {
            toast({ description: result?.message, variant: 'destructive' });
        }
    }
    return (
        <form className="w-full mt-5 mb-auto" action={clientAction}>
            <Card>
                <CardHeader>
                    <CardTitle>{`Editing \`${feedback.heading}\``}</CardTitle>
                </CardHeader>
                <CardContent>
                    <input name="feedbackId" defaultValue={feedback.id} hidden readOnly />
                    <input name="userEmail" defaultValue={feedback.userEmail} hidden readOnly />
                    <div className="grid w-full items-center gap-y-8">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Feedback Title</Label>
                            <small className="text-black/40">Add a short, descriptive headline</small>
                            <Input name="heading" id="heading" defaultValue={feedback.heading} />
                        </div>
                        <CategoryInput categories={categories} selectedCategoryName={feedback.categoryName} />
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Update Status</Label>
                            <small className="text-black/40">Change feedback state</small>
                            <Select name="status" defaultValue={feedback.status}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="PLANNED">Planned</SelectItem>
                                    <SelectItem value="INPROGRESS">In Progress</SelectItem>
                                    <SelectItem value="LIVE">Live</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="content">Feedback Detail</Label>
                            <small className="text-black/40">Include any specific comments on what should be improved, added, etc.</small>
                            <Textarea name="content" id="content" defaultValue={feedback.content} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href={`/id/${feedback.id}`}>
                        <Button variant="outline">Cancel</Button></Link>
                    <SubmitButton>Update Feedback</SubmitButton>
                </CardFooter>
            </Card>
        </form>
    )
}