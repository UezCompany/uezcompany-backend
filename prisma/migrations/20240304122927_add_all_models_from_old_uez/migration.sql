-- CreateEnum
CREATE TYPE "TipoServico" AS ENUM ('ONLINE', 'PRESENCIAL', 'AMBOS');

-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('ATIVO', 'INATIVO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('UZER', 'CLIENTE');

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "situacao" "Situacao" NOT NULL,
    "motivoBloqueio" TEXT,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telefone" TEXT,
    "tipoUsuario" "TipoUsuario" NOT NULL,
    "quantidadePedidos" INTEGER,
    "photoUrl" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
    "lastOnline" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uzers" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "situacao" "Situacao" NOT NULL,
    "motivoBloqueio" TEXT,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numeroTelefone" TEXT,
    "tipoUsuario" "TipoUsuario" NOT NULL,
    "quantidadePedidos" INTEGER,
    "photoUrl" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
    "quantidadePedidosRealizados" INTEGER,
    "avaliacao" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avaliacoes" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "lastOnline" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Uzers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoServico" NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL DEFAULT 'Serviço oferecido pela UezCompany',
    "quantidadeFeitos" INTEGER NOT NULL DEFAULT 0,
    "taxaPadrao" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "uzersId" TEXT,

    CONSTRAINT "Servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL DEFAULT 'Pedido criado na UezCompany, somente um Uzer pode finaliza-lo.',
    "status" TEXT NOT NULL DEFAULT 'A REALIZAR',
    "servicoId" TEXT NOT NULL,
    "uzerId" TEXT,
    "clienteId" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFinalizacao" TIMESTAMP(3),
    "valor" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "images" TEXT[],
    "avaliacao" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avaliado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacoes" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readed" BOOLEAN NOT NULL DEFAULT false,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "Notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_username_key" ON "Clientes"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_cpf_key" ON "Clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Uzers_username_key" ON "Uzers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Uzers_email_key" ON "Uzers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Uzers_cpf_key" ON "Uzers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Servicos_nome_key" ON "Servicos"("nome");

-- AddForeignKey
ALTER TABLE "Servicos" ADD CONSTRAINT "Servicos_uzersId_fkey" FOREIGN KEY ("uzersId") REFERENCES "Uzers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_uzerId_fkey" FOREIGN KEY ("uzerId") REFERENCES "Uzers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
