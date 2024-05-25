"use client"

import * as React from "react"
import SortDropDown from "@/components/sort-dropdown";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Tag } from "@prisma/client";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function FeedbackNavigationMenu({ tags }: { tags: Tag[] }) {
    const [selectedTag, setSelectedTag] = useState<string[]>([]);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleTagSelect = (tag: { id: string, name: string }) => {
        let tags;
        const params = new URLSearchParams(searchParams.toString())
        if (selectedTag.includes(tag.name)) {
            tags = [...selectedTag.filter(t => t != tag.name)];
            params.delete("tag", tag.name);
        } else {
            tags = [...selectedTag, tag.name];
            params.append("tag", tag.name);
        }
        setSelectedTag(tags);
        router.push(`${pathname}?${params.toString()}`);

    }
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Tags</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[300px] flex gap-3 p-3 items-start justify-start flex-wrap">
                            {tags.map((tag, index) => <Badge className="hover:cursor-pointer" variant={selectedTag.includes(tag.name) ? 'default' : 'outline'} onClick={() => handleTagSelect(tag)} key={index}>{tag.name}</Badge>)}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Roadmap</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[200px] p-4">
                            <div className="flex justify-between mb-5 font-semibold">
                                <p>Roadmap</p>
                                <p>View</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Planned</p>
                                <p>2</p>
                            </div>
                            <div className="flex justify-between">
                                <p>In-Progress</p>
                                <p>2</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Live</p>
                                <p>1</p>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <SortDropDown />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
