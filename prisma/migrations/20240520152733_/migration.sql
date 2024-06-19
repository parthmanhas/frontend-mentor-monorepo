/*
  Warnings:

  - You are about to drop the column `CommentCount` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "CommentCount",
DROP COLUMN "commentId";
