/*
  Warnings:

  - Made the column `idCliente` on table `Pedidos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_idCliente_fkey";

-- AlterTable
ALTER TABLE "Pedidos" ALTER COLUMN "idCliente" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
