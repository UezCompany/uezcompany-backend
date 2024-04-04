/*
  Warnings:

  - You are about to drop the column `uzersId` on the `Servicos` table. All the data in the column will be lost.
  - Made the column `telefone` on table `Clientes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `idServico` to the `Uzers` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefone` on table `Uzers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Servicos" DROP CONSTRAINT "Servicos_uzersId_fkey";

-- AlterTable
ALTER TABLE "Clientes" ALTER COLUMN "telefone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Servicos" DROP COLUMN "uzersId";

-- AlterTable
ALTER TABLE "Uzers" ADD COLUMN     "idServico" TEXT NOT NULL,
ALTER COLUMN "telefone" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Uzers" ADD CONSTRAINT "Uzers_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "Servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
