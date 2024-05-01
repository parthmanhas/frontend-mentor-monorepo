/*
  Warnings:

  - You are about to drop the column `data` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "data",
ADD COLUMN     "content" TEXT NOT NULL;
