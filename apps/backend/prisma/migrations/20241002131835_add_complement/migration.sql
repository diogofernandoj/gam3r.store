/*
  Warnings:

  - You are about to drop the column `complemento` on the `DeliveryOrder` table. All the data in the column will be lost.
  - Added the required column `complement` to the `DeliveryOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryOrder" DROP COLUMN "complemento",
ADD COLUMN     "complement" TEXT NOT NULL;
