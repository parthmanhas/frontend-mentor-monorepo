"use client";

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
export default function SuggestionCardUpvoteButton({ feedbackId, upvotes, updateUpvote }: { feedbackId: string, upvotes: number, updateUpvote: Function }) {
    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUpvoteCount(upvotes);
    }, [upvotes]);

    const handleUpvote = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const updatedVotes = await updateUpvote(feedbackId);
        if (!updatedVotes) {
            console.error('Error updating upvotes');
            setLoading(false);
            return;
        }
        setLoading(false);
        setUpvoteCount(updatedVotes);
    }

    return (
        <Button variant="outline" onClick={handleUpvote}>
            {!loading ? `Upvotes ${upvoteCount}` : <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>}
        </Button>
    )
}