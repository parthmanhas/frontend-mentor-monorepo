'use client';

import Button from "@/app/components/Button";
import DropDown from "@/app/components/DropDown";
import clsx from "clsx";
import { Suspense, useEffect, useState } from "react";
import { FaCheck, FaPlus, FaChevronLeft } from 'react-icons/fa';
import { addFeedback } from "../_actions/feedback";
import { Category } from "@prisma/client";

function LoadingCategorySkeleton() {
    return <div className="w-full mb-5 outline-royal-blue-500 rounded-sm bg-gray-200 h-10"></div>;
}

function DelayedSelect() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds delay
        return () => clearTimeout(timer);
    }, []);

    // if (loading) {
    //     throw new Promise(resolve => setTimeout(resolve, 2000));
    // }

    return (
        <div>
            <h3>Category</h3>
            <p className="mt-1">Choose a category for your feedback</p>
            <select className="w-full mb-5 outline-royal-blue-500 rounded-sm" name="category">
                <option value="feature">Feature</option>
                <option value="ui">UI</option>
                <option value="ux">UX</option>
                <option value="enhancement">Enhancement</option>
                <option value="bug">Bug</option>
            </select>
        </div>
    );
}
export default function Page() {

    const [feedbackDetail, setFeedbackDetail] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [title, setTitle] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch('/api/categories', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                console.error('Error Fetching categories');
            }

            const data = await response.json();
            setCategories(data.categories);
        }
        getCategories();
    }, [])

    return (
        <div className="m-5 flex justify-center">
            <div className="max-w-lg">
                <Button type="button" className="mb-8" variant="none">
                    <div className="flex items-center">
                        <FaChevronLeft color="blue" className="mr-2" />
                        <p className="text-waikawa-gray-700 font-semibold">Go Back</p>
                    </div>
                </Button>
                <form action={addFeedback} className="p-5 bg-white rounded-md text-east-bay-900 relative">
                    <div className="absolute -top-6 w-[50px] h-[50px] rounded-full flex justify-center items-center bg-purple-400">
                        <FaPlus size={25} color="white" />
                    </div>
                    <h1 className="my-5">Create New Feedback</h1>
                    <div>
                        <h3>Feedback Title</h3>
                        <p className="mt-1">Add a short, descriptive headline</p>
                        <input name="title" onChange={e => setTitle(e.target.value)} value={title} className={clsx({
                            "bg-zircon-50 rounded-md w-full my-4 p-4": true,
                            "outline-royal-blue-500": !(title.length === 0 && formSubmitted),
                            "outline-red-500 border-2 border-red-500": title.length === 0 && formSubmitted
                        })}></input>
                        {title.length === 0 && formSubmitted && <p className="text-red-500 mb-4">Can't be empty</p>}

                    </div>
                    <Suspense fallback={<LoadingCategorySkeleton />}>
                        <div>
                            <h3>Category</h3>
                            <p className="mt-1">Choose a category for your feedback</p>
                            <select className="w-full mb-5 outline-royal-blue-500 rounded-sm" name="category">
                                {categories?.map((category: Category) => <option value={category.name}>{category.name.toUpperCase()}</option>)}
                            </select>
                        </div>
                    </Suspense>
                    <div>
                        <h3>Feedback Detail</h3>
                        <p className="mt-1">Include any specific comments on what should be improved, added, etc.</p>
                        <textarea name="feedback" onChange={e => setFeedbackDetail(e.target.value)} value={feedbackDetail} className={clsx({
                            "bg-zircon-50 rounded-md w-full my-4 h-[150px] p-4": true,
                            "outline-royal-blue-500": !(feedbackDetail.length === 0 && formSubmitted),
                            "outline-red-500 border-2 border-red-500": feedbackDetail.length === 0 && formSubmitted
                        })}></textarea>
                        {feedbackDetail.length === 0 && formSubmitted && <p className="text-red-500">Can't be empty</p>}
                    </div>
                    <div className="md:flex w-full md:justify-end">
                        <Button type="submit" onClick={() => setFormSubmitted(true)} className="w-full md:w-fit md:h-fit mb-5 text-white semibold py-3 md:mr-3" variant="purple"><span className="w-full">Add Feedback</span></Button>
                        <Button type="button" onClick={() => { setFormSubmitted(false); setFeedbackDetail(''); setTitle('') }} className="w-full md:w-fit md:h-fit text-white semibold py-3" variant="east-bay"><span className="w-full">Cancel</span></Button>
                    </div>
                </form>
            </div>
        </div>
    )
}