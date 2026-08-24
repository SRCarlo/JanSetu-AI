-- CreateTable
CREATE TABLE "CitizenRequest" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "affectedGroups" TEXT[],
    "location" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CitizenRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CitizenRequest_category_idx" ON "CitizenRequest"("category");

-- CreateIndex
CREATE INDEX "CitizenRequest_urgency_idx" ON "CitizenRequest"("urgency");

-- CreateIndex
CREATE INDEX "CitizenRequest_location_idx" ON "CitizenRequest"("location");

-- CreateIndex
CREATE INDEX "CitizenRequest_createdAt_idx" ON "CitizenRequest"("createdAt");
