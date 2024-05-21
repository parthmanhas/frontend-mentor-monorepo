import PageContent from "@/components/page-content";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function CreateFeedbackPage() {
    return (
        <PageContent className="py-5 items-center justify-center max-w-[600px]">
            <div className="w-full flex mb-auto">
                <Link href="/">
                    <Button className="">Go Back</Button>
                </Link>
            </div>
            <Card className="w-full mb-auto">
                <CardHeader>
                    <CardTitle>Create new feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Feedback Title</Label>
                                <small className="text-black/40">Add a short, descriptive headline</small>
                                <Input id="title" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="feature">Feature</SelectItem>
                                        <SelectItem value="bug">Bug</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="content">Feedback Detail</Label>
                                <small className="text-black/40">Include any specific comments on what should be improved, added, etc.</small>
                                <Textarea id="content" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Add Feedback</Button>
                </CardFooter>
            </Card>

        </PageContent>
    )
}