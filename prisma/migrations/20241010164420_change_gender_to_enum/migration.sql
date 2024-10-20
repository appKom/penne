-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('Mann', 'Kvinne', 'Annet');

-- AlterTable
ALTER TABLE "Member"
ALTER COLUMN "gender" TYPE "GenderType"
USING ("gender"::"GenderType");
