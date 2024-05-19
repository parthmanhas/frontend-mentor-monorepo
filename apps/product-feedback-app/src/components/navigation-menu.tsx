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
import { Badge } from "./ui/badge"

export function FeedbackNavigationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Tags</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[300px] flex gap-3 p-3 items-start justify-start flex-wrap">
                            <Badge>All</Badge>
                            <Badge>UI</Badge>
                            <Badge>UX</Badge>
                            <Badge>Enhancement</Badge>
                            <Badge>Bug</Badge>
                            <Badge>Feature</Badge>
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
