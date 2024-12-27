/*
  Warnings:

  - The values [UZER] on the enum `USERTYPE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `uzerId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "USERTYPE_new" AS ENUM ('UEZER', 'CLIENT', 'BOTH');
ALTER TABLE "User" ALTER COLUMN "usertype" TYPE "USERTYPE_new" USING ("usertype"::text::"USERTYPE_new");
ALTER TYPE "USERTYPE" RENAME TO "USERTYPE_old";
ALTER TYPE "USERTYPE_new" RENAME TO "USERTYPE";
DROP TYPE "USERTYPE_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_uzerId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "uzerId",
ADD COLUMN     "uezerId" TEXT,
ALTER COLUMN "description" SET DEFAULT 'Pedido criado na UezCompany, somente um Uezer pode finaliza-lo.';

-- AlterTable
ALTER TABLE "Speciality" ALTER COLUMN "description" SET DEFAULT 'Especialidade oferecido pela UezCompany';

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_uezerId_fkey" FOREIGN KEY ("uezerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
