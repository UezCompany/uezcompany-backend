-- AlterTable
ALTER TABLE "Uzers" ADD COLUMN     "idCliente" TEXT,
ALTER COLUMN "bannerUrl" SET DEFAULT 'https://uezcompanys3.s3.us-east-2.amazonaws.com/defaultbanner.jpg';

-- AddForeignKey
ALTER TABLE "Uzers" ADD CONSTRAINT "Uzers_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
