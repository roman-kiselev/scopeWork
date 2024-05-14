/*
  Warnings:

  - You are about to drop the column `indexPosition` on the `OrderReceiptName` table. All the data in the column will be lost.
  - Added the required column `index` to the `OrderReceiptName` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderReceiptName" DROP COLUMN "indexPosition",
ADD COLUMN     "index" INTEGER NOT NULL;
