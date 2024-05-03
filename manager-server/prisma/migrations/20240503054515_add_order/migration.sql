-- AlterTable
ALTER TABLE "TransportCompanyToProvider" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "OrderReceipt" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "userCreateId" INTEGER NOT NULL,
    "storageId" INTEGER NOT NULL,

    CONSTRAINT "OrderReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderReceiptName" (
    "id" BIGSERIAL NOT NULL,
    "index" INTEGER NOT NULL,
    "nameWorkId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "orderReceiptId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,

    CONSTRAINT "OrderReceiptName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderReceipt_id_key" ON "OrderReceipt"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderReceiptName_id_key" ON "OrderReceiptName"("id");

-- AddForeignKey
ALTER TABLE "OrderReceipt" ADD CONSTRAINT "OrderReceipt_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderReceiptName" ADD CONSTRAINT "OrderReceiptName_orderReceiptId_fkey" FOREIGN KEY ("orderReceiptId") REFERENCES "OrderReceipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderReceiptName" ADD CONSTRAINT "OrderReceiptName_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
