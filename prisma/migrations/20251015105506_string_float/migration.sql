/*
  Warnings:

  - Changed the type of `price` on the `Watch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `discountedPrice` on the `Watch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Watch" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "discountedPrice",
ADD COLUMN     "discountedPrice" DOUBLE PRECISION NOT NULL;
