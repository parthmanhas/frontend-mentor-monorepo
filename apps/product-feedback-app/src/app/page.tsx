import Content from "@/components/content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { FeedbackNavigationMenu } from '@/components/navigation-menu';
import EmptyFeedback from "@/components/empty-feedback";
import Link from "next/link";
import PageContent from "@/components/page-content";
import { getAllTags, getFeedbacks } from "@/lib/server";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {

  let tags = null;
  if (searchParams["tag"]) {
    tags = Array.isArray(searchParams["tag"]) ? searchParams["tag"] : [searchParams["tag"]];
  }

  const { sort, order } = searchParams;
  let sortOption = { sort, order } as { sort: string, order: "asc" | "desc" };

  let feedbacks = await getFeedbacks(tags, sortOption);
  const allTags = await getAllTags();


  return (
    <PageContent className="min-h-screen justify-between">
      <nav className="flex items-center w-full justify-between p-8 bg-black/5 h-[100px]">
        <h1>Feedback Board</h1>
        <FeedbackNavigationMenu tags={allTags} />
        <div>
          <p className="font-bold text-xl">{feedbacks.length} Suggestions</p>
        </div>
        <Link href="/create">
          <Button>Add Feedback</Button>
        </Link>
      </nav>
      <Content className="flex flex-1">
        {feedbacks.length > 0 &&
          <div className="w-full flex flex-col mt-5 gap-4 pb-5">
            {feedbacks?.map((feedback, index) => (
              <Link href={`/${feedback.id}`}>
                <SuggestionCard key={index} feedback={feedback} />
              </Link>
            ))}
          </div>
        }
        {feedbacks.length === 0 && <EmptyFeedback />}
      </Content>
    </PageContent>
  );
}
