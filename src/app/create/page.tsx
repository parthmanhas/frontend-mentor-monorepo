import CreateFeedbackForm from "@/components/create-feedback-form";
import PageContent from "@/components/page-content";
import { Button } from "@/components/ui/button";
import { getAllCategory } from "@/lib/server";
import Link from "next/link";

export default async function CreateFeedbackPage() {

    const categories = await getAllCategory();
    return (
        <PageContent className="p-5 items-center justify-center md:max-w-[600px]">
            <div className="w-full flex mb-auto">
                <Link href="/">
                    <Button className="">Go Back</Button>
                </Link>
            </div>
            <CreateFeedbackForm categories={categories} />
        </PageContent>
    )
}