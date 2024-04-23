/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Categorias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categorias_nome_key" ON "Categorias"("nome");
