/*
  Warnings:

  - You are about to drop the column `onlineFondetId` on the `Composition` table. All the data in the column will be lost.
  - You are about to drop the column `onlineFondetId` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the `OnlineFondet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Composition" DROP CONSTRAINT "Composition_onlineFondetId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_onlineFondetId_fkey";

-- AlterTable
ALTER TABLE "Composition" DROP COLUMN "onlineFondetId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "onlineFondetId";

-- DropTable
DROP TABLE "OnlineFondet";
