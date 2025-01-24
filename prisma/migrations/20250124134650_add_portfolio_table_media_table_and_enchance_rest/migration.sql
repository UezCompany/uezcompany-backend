/*
  Warnings:

  - You are about to drop the column `images` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VISIBILITY" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "MEDIATYPE" AS ENUM ('image', 'video', 'text', 'link');

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Descrição do projeto.',
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visibility" "VISIBILITY" NOT NULL DEFAULT 'PUBLIC',
ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "banner" SET DEFAULT 'https://uez-prod-images.s3.sa-east-1.amazonaws.com/defaults/defaultbanner.jpg';

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "MEDIATYPE" NOT NULL,
    "image" TEXT,
    "text" TEXT,
    "url" TEXT,
    "portfolioId" TEXT,
    "orderId" TEXT,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_orderId_key" ON "Portfolio"("orderId");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
