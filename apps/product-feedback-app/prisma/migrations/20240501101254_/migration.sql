-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "parentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
