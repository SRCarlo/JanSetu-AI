import {
  prisma,
} from "../lib/prisma.js";

export async function getInfrastructureProfile(
  district: string,
  category: string
) {
  return prisma.infrastructureProfile.findFirst(
    {
      where: {
        district: {
          equals: district,
          mode: "insensitive",
        },

        category: {
          equals: category,
          mode: "insensitive",
        },
      },
    }
  );
}