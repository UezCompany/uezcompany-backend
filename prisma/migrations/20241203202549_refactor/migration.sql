/*
  Warnings:

  - Made the column `orders_amount` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `completed_orders_amount` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "orders_amount" SET NOT NULL,
ALTER COLUMN "orders_amount" SET DEFAULT 0,
ALTER COLUMN "completed_orders_amount" SET NOT NULL,
ALTER COLUMN "completed_orders_amount" SET DEFAULT 0;
