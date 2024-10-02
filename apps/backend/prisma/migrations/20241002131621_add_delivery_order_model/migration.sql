/*
  Warnings:

  - You are about to drop the `OrderDelivery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_delivery_id_fkey";

-- DropTable
DROP TABLE "OrderDelivery";

-- CreateTable
CREATE TABLE "DeliveryOrder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "DeliveryOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "DeliveryOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
