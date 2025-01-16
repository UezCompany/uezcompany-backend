/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ORDERSTATUS" AS ENUM ('OPEN', 'CANCELLED', 'IN_PROGRESS', 'WAITING_EVALUATION', 'COMPLETED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "ORDERSTATUS" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "_UserChats" ADD CONSTRAINT "_UserChats_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserChats_AB_unique";
