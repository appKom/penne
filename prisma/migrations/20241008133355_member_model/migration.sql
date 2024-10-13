/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Member" (
    "name" TEXT NOT NULL,
    "imageHref" TEXT,
    "role" TEXT,
    "current" BOOLEAN,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("name")
);
