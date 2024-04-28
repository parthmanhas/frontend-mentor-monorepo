import SuggestionsCard from '@/app/components/SuggestionsCard';
import db from '@/db/db';

const getFeedbacks = async () => {

    const pageNumber = 1; // replace with current page number
    const pageSize = 10; // replace with number of records per page

    const feedbacks = await db.feedback.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        include: {
            _count: {
                select: { comments: true },
            },
            tags: true
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