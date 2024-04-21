import SuggestionsCard from '@/app/components/SuggestionsCard';
import db from '@/db/db';

const getFeedbacks = async () => {
    const feedbacks = await db.feedback.findMany({
        include: {
            _count: {
                select: { comments: true },
            },
        },
    });
    return feedbacks;
}

export default async function FeedbackContainer() {
    const feedbacks = await getFeedbacks();
    return <>
        {feedbacks.map((feedback, index) => <SuggestionsCard key={index} data={feedback} className="m-5 md:m-0 md:mt-3" />)}
    </>
}