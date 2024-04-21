'use client';

import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";

export default function Upvote({ feedbackId, initialVotes, className = "" }: { feedbackId: string, initialVotes: number, className?: string }) {
    const [votes, setVotes] = useState(initialVotes);

    const vote = async () => {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedbackId, count: 1 })
        })

        if (!response.ok) {
            console.error(`Error upvoting ${feedbackId}`);
        } else {
            setVotes(votes + 1);
        }
    }

    useEffect(() => {
        const fetchVotes = async () => {
            const response = await fetch(`/api/vote?${feedbackId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                console.error(`Error Fetching votes ${feedbackId}`);
            } else {

                setVotes(data.votes);
            }
        }
        fetchVotes();
    }, [])

    return <div onClick={vote} className={clsx({
        "bg-zircon-50 w-fit rounded-lg flex md:flex-col justify-center items-center box-content px-3 py-2 md:p-3 hover:cursor-pointer hover:bg-royal-blue-200": className === "",
        [className]: className !== ""
    })}>
        <FaChevronUp color="blue" />
        <h4 className="text-east-bay-900 mt-1 ml-2 md:ml-0">{votes}</h4>
    </div>
}