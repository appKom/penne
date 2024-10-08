/*
  Warnings:

  - You are about to drop the column `current` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "current",
ADD COLUMN     "isCurrent" BOOLEAN;
