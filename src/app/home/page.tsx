import Content from "@/components/content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { FeedbackNavigationMenu } from '@/components/navigation-menu';
import EmptyFeedback from "@/components/empty-feedback";
import Link from "next/link";
import PageContent from "@/components/page-content";
import { getAllTags, getAllTotalFeedbacksCount, getFeedbacks, getMyTotalFeedbacksCount, getRoadmap } from '@/lib/server';
import { FeedbackWithTagsAndCommentsCount } from "@/lib/types";
import { SignOut } from "@/components/signout";
import auth from "@/auth";
import SelectFeedbackType from "@/components/select-feedback-type";
import { FeedbackPagination } from "@/components/feedback-pagination";
import { FEEDBACK_PER_PAGE } from '@/lib/constants';
import { MobileSidebar } from "@/components/mobile-sidebar";

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
    return;
  }
  const feedbackType = (searchParams["feedbacks"] as 'all' | 'my') || null;
  let allFeedbacksCount = null;
  let myFeedbacksCount = null;
  if (feedbackType === 'all') {
    allFeedbacksCount = await getAllTotalFeedbacksCount();
  } else {
    myFeedbacksCount = await getMyTotalFeedbacksCount();
  }

  const currentPage = (+searchParams["page"] || 0) as number;

  const feedbacksReponse = await getFeedbacks(currentPage, feedbackType, tags, sortOption);
  const feedbacks = feedbacksReponse?.map(feedback => {
    let totalComments = feedback?._count?.comments;
    return {
      ...feedback,
      totalComments
    } as FeedbackWithTagsAndCommentsCount;
  }) || [];


  const allTags = await getAllTags();

  const roadmapData = await getRoadmap();

  return (
    <PageContent className="min-h-screen justify-between">
      <nav className="flex items-center w-full justify-between p-8 bg-black/5 h-[100px]">
        <h1>Feedback Board</h1>
        <div className="hidden md:flex md:space-x-3 lg:space-x-5">
          <FeedbackNavigationMenu tags={allTags} roadmapData={roadmapData} />
          <SelectFeedbackType />
          <Link href="/create">
            <Button>Add Feedback</Button>
          </Link>
          <SignOut />
        </div>
        <MobileSidebar className="md:hidden" allTags={allTags} roadmapData={roadmapData} />
      </nav>
      <Content className="flex flex-1">
        {feedbacks?.length > 0 &&
          <div className="w-full flex flex-col mt-5 gap-4 pb-5">
            {feedbacks?.map((feedback, index) => (
              <Link key={index} href={`/id/${feedback.id}`}>
                <SuggestionCard displayTags={true} feedback={feedback} />
              </Link>
            ))}
          </div>
        }
        {feedbacks?.length === 0 && <EmptyFeedback />}
      </Content>
      {((allFeedbacksCount && allFeedbacksCount > FEEDBACK_PER_PAGE) || (myFeedbacksCount && myFeedbacksCount > FEEDBACK_PER_PAGE)) && <FeedbackPagination feedbacksCount={allFeedbacksCount || myFeedbacksCount || 0} />}
    </PageContent>
  );
}
