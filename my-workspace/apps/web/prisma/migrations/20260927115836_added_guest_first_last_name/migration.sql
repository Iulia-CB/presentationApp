/*
  Warnings:

  - You are about to drop the column `guestName` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "guestName",
ADD COLUMN     "guestFirstName" TEXT,
ADD COLUMN     "guestLastName" TEXT;
