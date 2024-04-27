/*
  Warnings:

  - You are about to drop the column `feedbackId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_feedbackId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "feedbackId";

-- CreateTable
CREATE TABLE "_FeedbackToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedbackToTag_AB_unique" ON "_FeedbackToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedbackToTag_B_index" ON "_FeedbackToTag"("B");

-- AddForeignKey
ALTER TABLE "_FeedbackToTag" ADD CONSTRAINT "_FeedbackToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToTag" ADD CONSTRAINT "_FeedbackToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
