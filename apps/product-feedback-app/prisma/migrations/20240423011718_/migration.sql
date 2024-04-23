/*
  Warnings:

  - You are about to drop the column `feedbackId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_feedbackId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "feedbackId";

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
