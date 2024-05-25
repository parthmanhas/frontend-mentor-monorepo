import CreateFeedbackForm from "@/components/create-feedback-form";
import PageContent from "@/components/page-content";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import Link from "next/link";

async function getAllCategory() {
    const result = await db.category.findMany();
    return result;
}


export default async function CreateFeedbackPage() {

    const categories = await getAllCategory();
    return (
        <PageContent className="py-5 items-center justify-center max-w-[600px]">
            <div className="w-full flex mb-auto">
                <Link href="/">
                    <Button className="">Go Back</Button>
                </Link>
            </div>
            <CreateFeedbackForm categories={categories} />
        </PageContent>
    )
}