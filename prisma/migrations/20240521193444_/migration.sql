/*
  Warnings:

  - Added the required column `categoryId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PLANNED', 'INPROGRESS', 'LIVE');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
