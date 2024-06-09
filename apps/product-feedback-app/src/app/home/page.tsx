import Content from "@/components/content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { FeedbackNavigationMenu } from '@/components/navigation-menu';
import EmptyFeedback from "@/components/empty-feedback";
import Link from "next/link";
import PageContent from "@/components/page-content";
import { getAllTags, getFeedbacks } from "@/lib/server";
import { FeedbackWithTagsAndCommentsCount } from "@/lib/types";
import { SignOut } from "@/components/signout";
import auth from "@/auth";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {

  let tags = null;
  if (searchParams["tag"]) {
    tags = Array.isArray(searchParams["tag"]) ? searchParams["tag"] : [searchParams["tag"]];
  }

  const { sort, order } = searchParams;
  let sortOption = { sort, order } as { sort: string, order: "asc" | "desc" };

  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    console.error('Session or user or email not present');
    // send to login page
    return;
  }

  let feedbacksReponse = await getFeedbacks(session.user.email, tags, sortOption);
  const feedbacks = feedbacksReponse?.map(feedback => {
    let totalComments = feedback?._count?.comments;
    for (const childrenCount of feedback.comments) {
      totalComments += childrenCount._count.children;
    }
    return {
      ...feedback,
      totalComments
    } as FeedbackWithTagsAndCommentsCount;
  })
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
        <SignOut />
      </nav>
      <Content className="flex flex-1">
        {feedbacks.length > 0 &&
          <div className="w-full flex flex-col mt-5 gap-4 pb-5">
            {feedbacks?.map((feedback, index) => (
              <Link key={index} href={`/id/${feedback.id}`}>
                <SuggestionCard displayTags={true} feedback={feedback} />
              </Link>
            ))}
          </div>
        }
        {feedbacks.length === 0 && <EmptyFeedback />}
      </Content>
    </PageContent>
  );
}
