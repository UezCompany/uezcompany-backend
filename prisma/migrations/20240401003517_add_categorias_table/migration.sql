/*
  Warnings:

  - You are about to drop the column `categoria` on the `Servicos` table. All the data in the column will be lost.
  - Added the required column `idCategoria` to the `Servicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicos" DROP COLUMN "categoria",
ADD COLUMN     "idCategoria" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Servicos" ADD CONSTRAINT "Servicos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
