/*
  Warnings:

  - Added the required column `category` to the `Watch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watch" ADD COLUMN     "category" TEXT NOT NULL;
