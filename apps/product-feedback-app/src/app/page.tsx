import Content from "@/components/content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { FeedbackNavigationMenu } from '@/components/navigation-menu';
import db from "@/lib/db";
import { FeedbackWithTags } from "@/lib/types";
import EmptyFeedback from "@/components/empty-feedback";
import Link from "next/link";

async function getFeedbacks() {
  const result = await db.feedback.findMany({
    where: {
      userEmail: 'Dawson35@hotmail.com'
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


export default async function Home() {

  const feedbacks = await getFeedbacks();
  // const feedbacks = []
  const allTags = await getAllTags();

  return (
    <main className="flex flex-col min-h-screen justify-between max-w-[1280px] mx-auto">
      <nav className="flex items-center w-full justify-between p-8 bg-black/5 h-[100px]">
        <h1>Feedback Board</h1>
        <FeedbackNavigationMenu tags={allTags} />
        <div>
          <p className="font-bold text-xl">{feedbacks.length} Suggestions</p>
        </div>
        <Button>Add Feedback</Button>
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
    </main>
  );
}
