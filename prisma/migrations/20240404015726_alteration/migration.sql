/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Chats` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Chats` table. All the data in the column will be lost.
  - Added the required column `idCliente` to the `Chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUzer` to the `Chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chats" DROP COLUMN "creatorId",
DROP COLUMN "receiverId",
ADD COLUMN     "idCliente" TEXT NOT NULL,
ADD COLUMN     "idUzer" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_idUzer_fkey" FOREIGN KEY ("idUzer") REFERENCES "Uzers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
