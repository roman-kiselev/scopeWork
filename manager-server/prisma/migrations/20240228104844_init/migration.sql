/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "TransportCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Providers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportCompanyToProvider" (
    "id" SERIAL NOT NULL,
    "transportCompanyId" INTEGER NOT NULL,
    "providersId" INTEGER NOT NULL,

    CONSTRAINT "TransportCompanyToProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProvidersToTransportCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TransportCompany_id_key" ON "TransportCompany"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TransportCompany_name_key" ON "TransportCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Providers_id_key" ON "Providers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Providers_name_key" ON "Providers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TransportCompanyToProvider_id_key" ON "TransportCompanyToProvider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProvidersToTransportCompany_AB_unique" ON "_ProvidersToTransportCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_ProvidersToTransportCompany_B_index" ON "_ProvidersToTransportCompany"("B");

-- AddForeignKey
ALTER TABLE "TransportCompanyToProvider" ADD CONSTRAINT "TransportCompanyToProvider_transportCompanyId_fkey" FOREIGN KEY ("transportCompanyId") REFERENCES "TransportCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportCompanyToProvider" ADD CONSTRAINT "TransportCompanyToProvider_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "Providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProvidersToTransportCompany" ADD CONSTRAINT "_ProvidersToTransportCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProvidersToTransportCompany" ADD CONSTRAINT "_ProvidersToTransportCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "TransportCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
