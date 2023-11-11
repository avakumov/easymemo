-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Question_question_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
