import { getAllCategory, getFeedbackWithoutTags } from "@/lib/server";
import PageContent from '@/components/page-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EditFeedbackForm from "@/components/edit-feedback-form";

type EditFeedbackPageProps = {
    params: {
        id: string
    }
}

export default async function FeedbackEdit({ params }: EditFeedbackPageProps) {
    const { id } = params;
    const feedback = await getFeedbackWithoutTags(id);
    if (!feedback) {
        console.error('Cannot find feedback');
        return;
    }
    const categories = await getAllCategory();
    return (
        <PageContent className="py-5 items-center justify-center max-w-[600px]">
            <div className="w-full flex mb-auto">
                <Link href={`/${id}`}>
                    <Button className="">Go Back</Button>
                </Link>
            </div>
            <EditFeedbackForm feedback={feedback} categories={categories} />

        </PageContent>
    )
}