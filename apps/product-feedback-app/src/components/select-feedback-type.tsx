'use client';

import { Button } from '@/components/ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
export default function SelectFeedbackType() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleFeedbackSelect = (type: 'all' | 'my') => {
        const params = new URLSearchParams(searchParams.toString())
        if (params.has("feedbacks")) {
            params.set("feedbacks", type);
        } else {
            params.append("feedbacks", type);
        }
        router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="space-x-2">
            <Select onValueChange={handleFeedbackSelect} defaultValue={searchParams.get('feedbacks') || 'my'}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Feeback Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="my">My Feedbacks</SelectItem>
                    <SelectItem value="all">All Feedbacks</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}