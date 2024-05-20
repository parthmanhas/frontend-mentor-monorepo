"use client";

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SORT_OPTIONS } from '@/lib/constants';
import { useState } from 'react';

export default function SortDropDown() {

    const [selectedOption, setSelectedOption] = useState('');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {Object.entries(SORT_OPTIONS).map(([key, value], index) => (
                    <DropdownMenuCheckboxItem key={index} checked={key === selectedOption} onCheckedChange={() => setSelectedOption(key)}>
                        {value}
                    </DropdownMenuCheckboxItem>))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}