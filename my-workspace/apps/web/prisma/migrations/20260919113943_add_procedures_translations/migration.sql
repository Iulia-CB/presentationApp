/*
  Warnings:

  - You are about to drop the column `description` on the `procedures` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `procedures` table. All the data in the column will be lost.
  - Added the required column `descriptionEn` to the `procedures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionRo` to the `procedures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `procedures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleRo` to the `procedures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "procedures" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "descriptionEn" TEXT NOT NULL,
ADD COLUMN     "descriptionRo" TEXT NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL,
ADD COLUMN     "titleRo" TEXT NOT NULL;
