/*
  Warnings:

  - The `serviceName` column on the `CustomOrders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CustomOrders" DROP COLUMN "serviceName",
ADD COLUMN     "serviceName" TEXT[];
