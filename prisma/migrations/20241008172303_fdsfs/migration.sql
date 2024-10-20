/*
  Warnings:

  - Made the column `imageHref` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isCurrent` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "imageHref" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "isCurrent" SET NOT NULL;
