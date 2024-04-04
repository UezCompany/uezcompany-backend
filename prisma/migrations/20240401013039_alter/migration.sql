-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "clientesId" TEXT;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_clientesId_fkey" FOREIGN KEY ("clientesId") REFERENCES "Clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
