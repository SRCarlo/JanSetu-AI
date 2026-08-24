import { prisma } from "../lib/prisma.js";

export async function calculateCitizenDemand(
  location: string,
  category: string
): Promise<number> {

  const normalizedCategory =
    category.trim().toUpperCase();

  const requests =
    await prisma.citizenRequest.findMany({
      where: {
        location: {
          contains: location,
          mode: "insensitive",
        },

        category: {
          equals: normalizedCategory,
          mode: "insensitive",
        },
      },

      select: {
        urgency: true,
      },
    });

  const requestCount =
    requests.length;

  const urgentRequests =
    requests.filter(
      (
        request: {
          urgency: string;
        }
      ) =>
        request.urgency
          .trim()
          .toUpperCase() ===
        "HIGH"
    ).length;

  const baseScore =
    Math.min(
      requestCount * 2,
      80
    );

  const urgencyScore =
    Math.min(
      urgentRequests * 4,
      20
    );

  const demandScore =
    Math.min(
      baseScore + urgencyScore,
      100
    );

  return Math.round(
    demandScore
  );
}