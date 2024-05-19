import Content from "@/components/content";
import Sidebar from "@/components/sidebar";
import SortDropDown from "@/components/sort-dropdown";
import SuggestionCard from "@/components/suggestion-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { NavigationMenuDemo, FeedbackNavigationMenu } from '@/components/navigation-menu';


export default function Home() {

  return (
    <main className="flex min-h-screen justify-between max-w-[1280px] mx-auto">
      <Content className="w-full h-full">
        <nav className="flex items-center w-full justify-between p-8 bg-black/5 h-[100px]">
          <h1>Feedback Board</h1>
          <FeedbackNavigationMenu />
          <div>
            <p className="font-bold text-xl">6 Suggestions</p>
          </div>
          <Button>Add Feedback</Button>
        </nav>
        <div className="w-full mt-5 space-y-4">
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
        </div>
      </Content>
    </main>
  );
}
