import { prisma } from "../lib/prisma.js";

import { calculatePriorityScore } from "./priority.service.js";

import { urgencyToScore } from "../utils/urgency.util.js";

export async function getDemandHotspots() {
  /**
   * Get all citizen requests.
   */
  const requests = await prisma.citizenRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  /**
   * Group requests by:
   *
   * district + category
   */
  const groups = new Map<string, typeof requests>();

  for (const request of requests) {
    const district = request.location.split(",")[0].trim();

    const category = request.category.trim().toUpperCase();

    const key = `${district}::${category}`;

    const existing = groups.get(key);

    if (existing) {
      existing.push(request);
    } else {
      groups.set(key, [request]);
    }
  }

  /**
   * Calculate hotspot data.
   */
  const hotspots = [];

  for (const [key, group] of groups.entries()) {
    const [district, category] = key.split("::");

    /**
     * Get infrastructure profile.
     */
    const infrastructure = await prisma.infrastructureProfile.findUnique({
      where: {
        district_category: {
          district,
          category,
        },
      },
    });

    /**
     * Number of citizen requests.
     */
    const requestCount = group.length;

    /**
     * Count HIGH and CRITICAL
     * urgency requests.
     */
    const highUrgencyRequests = group.filter((request) => {
      const urgency = request.urgency.trim().toUpperCase();

      return urgency === "HIGH" || urgency === "CRITICAL";
    }).length;

    /**
     * Demand score.
     *
     * Each request contributes
     * to the demand signal.
     */
    const demandScore = Math.min(requestCount * 10, 100);

    /**
     * Infrastructure fallback.
     */
    const infrastructureGap = infrastructure?.infrastructureGap ?? 50;

    const populationImpact = infrastructure?.populationImpact ?? 50;

    const vulnerability = infrastructure?.vulnerability ?? 50;

    /**
     * Average urgency score.
     */
    const urgencyTotal = group.reduce(
      (total, request) => total + urgencyToScore(request.urgency),
      0,
    );

    const averageUrgency = requestCount > 0 ? urgencyTotal / requestCount : 0;

    /**
     * Calculate hotspot priority.
     */
    const priorityResult = calculatePriorityScore({
      citizenDemand: demandScore,

      urgency: averageUrgency,

      infrastructureGap,

      populationImpact,

      vulnerability,
    });

    hotspots.push({
      district,

      category,

      requestCount,

      highUrgencyRequests,

      demandScore: Math.round(demandScore),

      averageUrgency: Math.round(averageUrgency),

      infrastructureGap,

      populationImpact,

      vulnerability,

      priorityScore: priorityResult.total,

      priorityLevel: priorityResult.level,
    });
  }

  /**
   * Sort highest priority first.
   */
  hotspots.sort((a, b) => b.priorityScore - a.priorityScore);

  return {
    totalRequests: requests.length,

    totalHotspots: hotspots.length,

    hotspots,
  };
}
