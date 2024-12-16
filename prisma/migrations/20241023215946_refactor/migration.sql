/*
  Warnings:

  - You are about to drop the column `idPedido` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the `Categorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notificacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedidos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servicos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Uzers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SERVICETYPE" AS ENUM ('ONLINE', 'PRESENCIAL', 'AMBOS');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "USERTYPE" AS ENUM ('UZER', 'CLIENT', 'BOTH');

-- CreateEnum
CREATE TYPE "MESSAGETYPE" AS ENUM ('TEXT', 'BUDGET', 'IMAGE', 'FILE');

-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_idUzer_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_idChat_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_idPedido_fkey";

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_idServico_fkey";

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_idUzer_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_idPedido_fkey";

-- DropForeignKey
ALTER TABLE "Servicos" DROP CONSTRAINT "Servicos_idCategoria_fkey";

-- DropForeignKey
ALTER TABLE "Uzers" DROP CONSTRAINT "Uzers_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "Uzers" DROP CONSTRAINT "Uzers_idServico_fkey";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "idPedido",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Categorias";

-- DropTable
DROP TABLE "Chats";

-- DropTable
DROP TABLE "Clientes";

-- DropTable
DROP TABLE "Messages";

-- DropTable
DROP TABLE "Notificacoes";

-- DropTable
DROP TABLE "Pedidos";

-- DropTable
DROP TABLE "Servicos";

-- DropTable
DROP TABLE "Uzers";

-- DropEnum
DROP TYPE "Situacao";

-- DropEnum
DROP TYPE "TipoMensagem";

-- DropEnum
DROP TYPE "TipoServico";

-- DropEnum
DROP TYPE "TipoUsuario";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "cpf" TEXT,
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "block_reason" TEXT,
    "birth_date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT,
    "usertype" "USERTYPE" NOT NULL,
    "orders_amount" INTEGER,
    "image" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
    "completed_orders_amount" INTEGER,
    "serviceId" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ratings" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "last_online" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),
    "banner" TEXT DEFAULT 'https://uezcompanys3.s3.us-east-2.amazonaws.com/defaultbanner.jpg',
    "bio" TEXT DEFAULT 'Usuario criado na UezCompany, somente ele mesmo pode edita-lo.',
    "addressId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SERVICETYPE" NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Serviço oferecido pela UezCompany',
    "completed_orders_amount" INTEGER DEFAULT 0,
    "default_tax" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Pedido criado na UezCompany, somente um Uzer pode finaliza-lo.',
    "status" TEXT NOT NULL DEFAULT 'A REALIZAR',
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "images" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "rated" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "uzerId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readed" BOOLEAN NOT NULL DEFAULT false,
    "receiverId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "type" "MESSAGETYPE" NOT NULL DEFAULT 'TEXT',
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readed" BOOLEAN NOT NULL DEFAULT false,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserChats" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserChats_AB_unique" ON "_UserChats"("A", "B");

-- CreateIndex
CREATE INDEX "_UserChats_B_index" ON "_UserChats"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_uzerId_fkey" FOREIGN KEY ("uzerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserChats" ADD CONSTRAINT "_UserChats_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserChats" ADD CONSTRAINT "_UserChats_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
