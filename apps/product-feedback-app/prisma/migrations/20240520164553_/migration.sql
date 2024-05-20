-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userEmail_fkey";

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
