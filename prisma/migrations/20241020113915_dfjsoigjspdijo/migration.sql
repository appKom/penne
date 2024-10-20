-- CreateTable
CREATE TABLE "Composition" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "onlineFondetId" INTEGER,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "onlineFondetId" INTEGER,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnlineFondet" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "OnlineFondet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_onlineFondetId_fkey" FOREIGN KEY ("onlineFondetId") REFERENCES "OnlineFondet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_onlineFondetId_fkey" FOREIGN KEY ("onlineFondetId") REFERENCES "OnlineFondet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
