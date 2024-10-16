-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "purpose" TEXT NOT NULL,
    "grantedAmount" INTEGER NOT NULL,
    "amountApplied" INTEGER NOT NULL,
    "recipient" TEXT NOT NULL,
    "dateApplied" TIMESTAMP(3) NOT NULL,
    "dateGranted" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
