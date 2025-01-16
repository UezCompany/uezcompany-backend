/*
  Warnings:

  - You are about to drop the column `rating` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `User` table. All the data in the column will be lost.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "USERSTATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ratings",
DROP COLUMN "status",
ADD COLUMN     "status" "USERSTATUS" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "STATUS";

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "satisfaction" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "speed" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "execution" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "average" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "feedback" TEXT NOT NULL DEFAULT 'Avaliação feita na UezCompany, somente o cliente e o Uezer podem ver.',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_orderId_key" ON "Rating"("orderId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
