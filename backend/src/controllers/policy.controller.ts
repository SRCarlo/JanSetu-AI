import { Request, Response } from "express";

import { getDemandHotspots } from "../services/dashboard.service.js";

import { generatePolicyRecommendation } from "../services/policy.service.js";

export async function getPolicyRecommendations(_req: Request, res: Response) {
  try {
    const dashboard = await getDemandHotspots();

    /**
     * Generate recommendations
     * only for the top hotspots.
     *
     * Limiting this to 5 keeps the
     * prototype fast and reduces
     * unnecessary AI calls.
     */
    const topHotspots = dashboard.hotspots.slice(0, 5);

    const recommendations = [];

    for (const hotspot of topHotspots) {
      const recommendation = await generatePolicyRecommendation({
        district: hotspot.district,

        category: hotspot.category,

        requestCount: hotspot.requestCount,

        highUrgencyRequests: hotspot.highUrgencyRequests,

        demandScore: hotspot.demandScore,

        averageUrgency: hotspot.averageUrgency,

        infrastructureGap: hotspot.infrastructureGap,

        populationImpact: hotspot.populationImpact,

        vulnerability: hotspot.vulnerability,

        priorityScore: hotspot.priorityScore,

        priorityLevel: hotspot.priorityLevel,
      });

      recommendations.push(recommendation);
    }

    return res.json({
      success: true,

      data: {
        totalRecommendations: recommendations.length,

        recommendations,
      },
    });
  } catch (error) {
    console.error("Policy recommendation error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to generate policy recommendations",
    });
  }
}
