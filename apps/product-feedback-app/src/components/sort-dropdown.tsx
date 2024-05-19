"use client";

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SORT_OPTIONS } from '@/lib/constants';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function SortDropDown() {

    const [selectedOption, setSelectedOption] = useState<Checked>();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                    <DropdownMenuCheckboxItem checked={key === selectedOption} onCheckedChange={() => setSelectedOption(key)}>
                        {value}
                    </DropdownMenuCheckboxItem>))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}