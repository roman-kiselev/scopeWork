-- DropForeignKey
ALTER TABLE "OrderReceiptName" DROP CONSTRAINT "OrderReceiptName_orderReceiptId_fkey";

-- DropForeignKey
ALTER TABLE "OrderReceiptName" DROP CONSTRAINT "OrderReceiptName_providerId_fkey";

-- AlterTable
ALTER TABLE "OrderReceiptName" ALTER COLUMN "orderReceiptId" DROP NOT NULL,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderReceiptName" ADD CONSTRAINT "OrderReceiptName_orderReceiptId_fkey" FOREIGN KEY ("orderReceiptId") REFERENCES "OrderReceipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderReceiptName" ADD CONSTRAINT "OrderReceiptName_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
