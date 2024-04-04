/*
  Warnings:

  - You are about to drop the column `chatId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `Pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `servicoId` on the `Pedidos` table. All the data in the column will be lost.
  - Added the required column `idChat` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idServico` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_servicoId_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "chatId",
ADD COLUMN     "idChat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pedidos" DROP COLUMN "clienteId",
DROP COLUMN "servicoId",
ADD COLUMN     "idServico" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "Servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_idChat_fkey" FOREIGN KEY ("idChat") REFERENCES "Chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
