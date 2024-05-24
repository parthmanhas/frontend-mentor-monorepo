import Content from "@/components/content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { FeedbackNavigationMenu } from '@/components/navigation-menu';
import db from "@/lib/db";
import { FeedbackWithTags } from "@/lib/types";
import EmptyFeedback from "@/components/empty-feedback";
import Link from "next/link";
import PageContent from "@/components/page-content";

async function getAllFeedbacks() {
  const result = await db.feedback.findMany({
    where: {
      userEmail: 'Bret_Pacocha@gmail.com'
    },
    include: {
      tags: true
    }
  })
  return result as FeedbackWithTags[];
}

async function getAllTags() {
  const tags = await db.tag.findMany();
  return tags;
}

async function getFeedbacksFilterTags(filterTags: string[]) {

  if (filterTags.length === 0 || !filterTags) {
    return await getAllFeedbacks();
  }

  const result = await db.feedback.findMany({
    where: {
      tags: {
        some: {
          name: {
            in: filterTags
          }
        }
      }
    },
    include: {
      tags: true
    }
  })
  return result as FeedbackWithTags[];
}


export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {

  let tags = searchParams?.["tag"] || [];
  if (typeof tags === 'string') {
    tags = [tags];
  }

  let feedbacks = await getFeedbacksFilterTags(tags);
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
