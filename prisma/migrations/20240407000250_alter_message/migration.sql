-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "idPedido" TEXT;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "Pedidos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
