/*
  Warnings:

  - You are about to drop the column `attachments` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "attachments",
ADD COLUMN     "attachment" TEXT;
