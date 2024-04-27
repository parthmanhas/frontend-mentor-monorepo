'use client';

import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import Button from "@/app/components/Button";
import { FaPen, FaChevronLeft } from 'react-icons/fa';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/utils/utils";
import Categories from "../../components/categories";
import Statuses from "@/app/components/statuses";
import { updateFeedback } from '@/app/feedback/_actions/feedback';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const feedbackId = params.get('id');

    const { data, error, isLoading } = useSWR(`/api/feedback?id=${feedbackId}`, fetcher);
    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleDelete = async () => {
        const response = await fetch('/api/feedback', {
            method: 'DELETE',
            body: JSON.stringify({ feedbackId: data.id })
        })

        if (!response.ok) {
            console.error(`Failed to delete feedback with id: ${data.id}`);
        }
        router.push('/feedback/all');
    }

    return (
        <div className="m-5">
            <Button onClick={() => router.back()} className="mb-8" variant="none">
                <div className="flex items-center">
                    <FaChevronLeft color="blue" className="mr-2" />
                    <p className="text-waikawa-gray-700 font-semibold">Go Back</p>
                </div>
            </Button>
            <form action={updateFeedback} className="rounded-md text-black h-fit bg-white mt-8 p-5 relative">
                <div className="w-50 h-50 rounded-full text-white bg-purple-500 absolute p-4 -top-6 left-5">
                    <FaPen size={20} />
                </div>

                <h1 className="text-east-bay-900 my-8">Editing feedback title</h1>
                <input hidden name="feedbackId" value={data.id} />
                <Input name="title" className="mb-8" title="Feedback Title" subtitle="Add a short, descriptive, headline" defaultValue={data.title} />
                <Statuses className="mb-5" />
                <Categories className="mb-5" defaultValue={data.category} />
                <TextArea name="feedback" title="Feedback Detail" subtitle="Include any specific comments on what should be improved, added, etc." defaultValue={data.feedback} />
                <div className="md:flex md:justify-between mt-7">
                    <Button onClick={handleDelete} variant="red" className="text-white font-semibold justify-center w-full mb-4 md:mb-0 md:w-fit">Delete</Button>
                    <div className="md:flex">
                        <Link href="/feedback/all">
                            <Button variant="east-bay" className="text-white font-semibold mr-3 w-full justify-center md:w-fit mb-4 md:mb-0">Cancel</Button>
                        </Link>
                        <Button type="submit" className="text-white font-semibold justify-center w-full md:mb-0">Update Feedback</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}