-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "guestEmail" TEXT,
ADD COLUMN     "guestName" TEXT,
ADD COLUMN     "guestPhone" TEXT,
ALTER COLUMN "patientId" DROP NOT NULL;
