-- AlterTable
ALTER TABLE "User" ALTER COLUMN "themeInterface" SET DEFAULT 'system';

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
