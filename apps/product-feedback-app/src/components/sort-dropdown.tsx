"use client";

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SORT_OPTIONS } from '@/lib/constants';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SortDropDown() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedOption, setSelectedOption] = useState('');

    const handleSortOptionSelect = (option: { name: string, field: string, order: 'asc' | 'desc' }) => {
        setSelectedOption(option.name);
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort", option.field);
        params.set("order", option.order)
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {/* {Object.entries(SORT_OPTIONS).map(([key, value], index) => (
                    <DropdownMenuCheckboxItem key={index} checked={key === selectedOption} onCheckedChange={() => handleSortOptionSelect(key)}>
                        {value}
                    </DropdownMenuCheckboxItem>))} */}
                {SORT_OPTIONS.map((option, index) => (
                    <DropdownMenuCheckboxItem key={index} checked={option.name === selectedOption} onCheckedChange={() => handleSortOptionSelect(option)}>
                        {option.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}