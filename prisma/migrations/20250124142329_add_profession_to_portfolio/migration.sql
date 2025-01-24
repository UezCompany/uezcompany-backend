/*
  Warnings:

  - Added the required column `professionId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "professionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Speciality" ADD COLUMN     "portfolioId" TEXT;

-- AddForeignKey
ALTER TABLE "Speciality" ADD CONSTRAINT "Speciality_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
