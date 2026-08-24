-- AlterTable
ALTER TABLE "CitizenRequest" ADD COLUMN     "inputMethod" TEXT NOT NULL DEFAULT 'TEXT';

-- CreateIndex
CREATE INDEX "CitizenRequest_inputMethod_idx" ON "CitizenRequest"("inputMethod");
