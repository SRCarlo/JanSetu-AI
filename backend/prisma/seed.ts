import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const profiles = [
  {
    district: "Satara",
    state: "Maharashtra",
    category: "ROAD",
    infrastructureGap: 82,
    populationImpact: 76,
    vulnerability: 65,
    totalPopulation: 3000000,
    affectedPopulation: 850000,
    source: "JanSetu Prototype Dataset",
    sourceYear: 2026,
  },

  {
    district: "Satara",
    state: "Maharashtra",
    category: "WATER",
    infrastructureGap: 78,
    populationImpact: 82,
    vulnerability: 72,
    totalPopulation: 3000000,
    affectedPopulation: 1100000,
    source: "JanSetu Prototype Dataset",
    sourceYear: 2026,
  },

  {
    district: "Nashik",
    state: "Maharashtra",
    category: "WATER",
    infrastructureGap: 85,
    populationImpact: 88,
    vulnerability: 70,
    totalPopulation: 6100000,
    affectedPopulation: 1900000,
    source: "JanSetu Prototype Dataset",
    sourceYear: 2026,
  },

  {
    district: "Pune",
    state: "Maharashtra",
    category: "HEALTHCARE",
    infrastructureGap: 62,
    populationImpact: 91,
    vulnerability: 55,
    totalPopulation: 9500000,
    affectedPopulation: 1600000,
    source: "JanSetu Prototype Dataset",
    sourceYear: 2026,
  },

  {
    district: "Nagpur",
    state: "Maharashtra",
    category: "PUBLIC_TRANSPORT",
    infrastructureGap: 68,
    populationImpact: 80,
    vulnerability: 60,
    totalPopulation: 4700000,
    affectedPopulation: 1200000,
    source: "JanSetu Prototype Dataset",
    sourceYear: 2026,
  },
];

async function main() {
  console.log("🌱 Seeding infrastructure profiles...");

  for (const profile of profiles) {
    await prisma.infrastructureProfile.upsert({
      where: {
        district_category: {
          district: profile.district,
          category: profile.category,
        },
      },

      update: profile,

      create: profile,
    });

    console.log(
      `✓ ${profile.district} - ${profile.category}`
    );
  }

  console.log(
    " Infrastructure profiles seeded successfully."
  );
}

main()
  .catch((error) => {
    console.error(" Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });