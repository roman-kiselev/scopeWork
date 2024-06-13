/*
  Warnings:

  - Added the required column `status` to the `OrderReceiptName` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "OrderReceiptName" ADD COLUMN     "rowId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "Status" NOT NULL;

-- CreateTable
CREATE TABLE "StorageQuantity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameWorkId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "storageId" INTEGER NOT NULL,

    CONSTRAINT "StorageQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageQuantityToOrderReceiptName" (
    "id" SERIAL NOT NULL,
    "orderReceiptNameId" INTEGER NOT NULL,
    "storageQuantityId" INTEGER NOT NULL,

    CONSTRAINT "StorageQuantityToOrderReceiptName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StorageQuantity_id_key" ON "StorageQuantity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StorageQuantityToOrderReceiptName_id_key" ON "StorageQuantityToOrderReceiptName"("id");

-- AddForeignKey
ALTER TABLE "StorageQuantity" ADD CONSTRAINT "StorageQuantity_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageQuantityToOrderReceiptName" ADD CONSTRAINT "StorageQuantityToOrderReceiptName_orderReceiptNameId_fkey" FOREIGN KEY ("orderReceiptNameId") REFERENCES "OrderReceiptName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageQuantityToOrderReceiptName" ADD CONSTRAINT "StorageQuantityToOrderReceiptName_storageQuantityId_fkey" FOREIGN KEY ("storageQuantityId") REFERENCES "StorageQuantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
