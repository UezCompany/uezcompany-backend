/*
  Warnings:

  - The values [PRESENCIAL,AMBOS] on the enum `SERVICETYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SERVICETYPE_new" AS ENUM ('ONLINE');
ALTER TABLE "Service" ALTER COLUMN "type" TYPE "SERVICETYPE_new" USING ("type"::text::"SERVICETYPE_new");
ALTER TYPE "SERVICETYPE" RENAME TO "SERVICETYPE_old";
ALTER TYPE "SERVICETYPE_new" RENAME TO "SERVICETYPE";
DROP TYPE "SERVICETYPE_old";
COMMIT;
