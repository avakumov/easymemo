-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "pdfFilePath" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pdfFilename" TEXT NOT NULL DEFAULT '';
