/*
  Warnings:

  - You are about to drop the column `tag` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "tag",
ADD COLUMN     "name" TEXT NOT NULL;
