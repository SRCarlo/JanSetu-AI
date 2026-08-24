-- CreateTable
CREATE TABLE "InfrastructureProfile" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "infrastructureGap" DOUBLE PRECISION NOT NULL,
    "populationImpact" DOUBLE PRECISION NOT NULL,
    "vulnerability" DOUBLE PRECISION NOT NULL,
    "totalPopulation" INTEGER NOT NULL,
    "affectedPopulation" INTEGER NOT NULL,
    "source" TEXT,
    "sourceYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfrastructureProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InfrastructureProfile_district_idx" ON "InfrastructureProfile"("district");

-- CreateIndex
CREATE INDEX "InfrastructureProfile_category_idx" ON "InfrastructureProfile"("category");

-- CreateIndex
CREATE UNIQUE INDEX "InfrastructureProfile_district_category_key" ON "InfrastructureProfile"("district", "category");
