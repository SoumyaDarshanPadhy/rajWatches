/*
  Warnings:

  - Added the required column `discountedPrice` to the `Watch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watch" ADD COLUMN     "discountedPrice" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "inStock" SET DEFAULT 10;
