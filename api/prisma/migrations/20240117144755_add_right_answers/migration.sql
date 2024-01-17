/*
  Warnings:

  - You are about to drop the column `failAnswerCount` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `successAnswerCount` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "failAnswerCount",
DROP COLUMN "successAnswerCount",
DROP COLUMN "viewCount",
ADD COLUMN     "rightAnswers" TEXT;
