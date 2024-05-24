"use client";

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
export default function SuggestionCardUpvoteButton({ feedbackId, upvotes, updateUpvote }: { feedbackId: string, upvotes: number, updateUpvote: Function }) {
    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    const [loading, setLoading] = useState(false);

    const handleUpvote = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const updatedVotes = await updateUpvote(feedbackId);
        if (!updatedVotes) {
            console.error('Error updating upvotes');
            setLoading(false);
            return;
        }

        setUpvoteCount(updatedVotes);
        setLoading(false);
    }

    return (
        <Button variant="outline" onClick={handleUpvote}>
            {!loading ? `Upvotes ${upvoteCount}` : <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>}
        </Button>
    )
}