/*
  Warnings:

  - You are about to drop the column `clientesId` on the `Pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `uzerId` on the `Pedidos` table. All the data in the column will be lost.
  - Changed the type of `tipo` on the `Pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_clientesId_fkey";

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_uzerId_fkey";

-- AlterTable
ALTER TABLE "Pedidos" DROP COLUMN "clientesId",
DROP COLUMN "uzerId",
ADD COLUMN     "idCliente" TEXT,
ADD COLUMN     "idUzer" TEXT,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoServico" NOT NULL;

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "idPedido" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idUzer_fkey" FOREIGN KEY ("idUzer") REFERENCES "Uzers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
