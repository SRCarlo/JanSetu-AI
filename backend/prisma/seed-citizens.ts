import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const requests = [
  {
    message: "Our village does not have proper drinking water supply.",
    language: "en",
    inputMethod: "TEXT",
    category: "WATER",
    urgency: "HIGH",
    problem: "Insufficient drinking water supply",
    affectedGroups: ["Residents", "Women", "Children"],
    location: "Satara, Maharashtra",
    summary: "Citizens need reliable drinking water infrastructure.",
    confidence: 0.95,
  },

  {
    message: "There is no regular water supply in our village.",
    language: "en",
    inputMethod: "TEXT",
    category: "WATER",
    urgency: "HIGH",
    problem: "Irregular water supply",
    affectedGroups: ["Residents", "Farmers"],
    location: "Satara, Maharashtra",
    summary: "Village faces irregular water supply.",
    confidence: 0.93,
  },

  {
    message: "The village road is badly damaged.",
    language: "en",
    inputMethod: "TEXT",
    category: "ROAD",
    urgency: "HIGH",
    problem: "Damaged road infrastructure",
    affectedGroups: ["Farmers", "Students", "Workers"],
    location: "Satara, Maharashtra",
    summary: "Poor road condition is affecting transportation.",
    confidence: 0.94,
  },

  {
    message: "We need better healthcare facilities.",
    language: "en",
    inputMethod: "TEXT",
    category: "HEALTHCARE",
    urgency: "MEDIUM",
    problem: "Limited healthcare facilities",
    affectedGroups: ["Elderly", "Women", "Children"],
    location: "Pune, Maharashtra",
    summary: "Citizens require improved healthcare facilities.",
    confidence: 0.91,
  },

  {
    message: "Farmers need better irrigation facilities.",
    language: "en",
    inputMethod: "TEXT",
    category: "IRRIGATION",
    urgency: "HIGH",
    problem: "Insufficient irrigation infrastructure",
    affectedGroups: ["Farmers"],
    location: "Pune, Maharashtra",
    summary: "Farmers require improved irrigation infrastructure.",
    confidence: 0.96,
  },
];

async function main() {
  console.log("🌱 Seeding citizen requests...");

  for (const request of requests) {
    await prisma.citizenRequest.create({
      data: request,
    });

    console.log(`✓ ${request.category} - ${request.location}`);
  }

  console.log(" Citizen requests seeded successfully.");
}

main()
  .catch((error) => {
    console.error(" Citizen seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
