import { prisma } from "../lib/prisma.js";

import { calculatePriorityScore } from "./priority.service.js";
import { calculateCitizenDemand } from "./demand.service.js";
import { getInfrastructureProfile } from "./infrastructure.service.js";
import { generateRecommendation } from "./recommendation.service.js";

import { urgencyToScore } from "../utils/urgency.util.js";

/**
 * Calculate the complete priority score
 * for a citizen development request.
 *
 * Combines:
 *
 * - Citizen demand
 * - Urgency
 * - Infrastructure gap
 * - Population impact
 * - Vulnerability
 *
 * Then generates an AI-powered recommendation
 * using Groq.
 */
export async function calculateRequestPriority(
  requestId: string
) {
  const request =
    await prisma.citizenRequest.findUnique({
      where: {
        id: requestId,
      },
    });

  if (!request) {
    throw new Error(
      "Citizen request not found"
    );
  }

  /**
   * Example:
   *
   * "Satara, Maharashtra"
   *
   * becomes:
   *
   * "Satara"
   */
  const district =
    request.location
      .split(",")[0]
      .trim();

  /**
   * Normalize category.
   *
   * water → WATER
   * Water → WATER
   * WATER → WATER
   */
  const category =
    request.category
      .trim()
      .toUpperCase();

  /**
   * Calculate citizen demand.
   */
  const demand =
    await calculateCitizenDemand(
      district,
      category
    );

  /**
   * Get infrastructure information.
   */
  const infrastructure =
    await getInfrastructureProfile(
      district,
      category
    );

  /**
   * If infrastructure data is not
   * available, use neutral values.
   */
  const infrastructureGap =
    infrastructure?.infrastructureGap ?? 50;

  const populationImpact =
    infrastructure?.populationImpact ?? 50;

  const vulnerability =
    infrastructure?.vulnerability ?? 50;

  /**
   * Convert urgency into numerical score.
   */
  const urgency =
    urgencyToScore(
      request.urgency
    );

  /**
   * Calculate JanSetu priority.
   */
/**
 * Calculate JanSetu priority.
 */
const priorityResult =
  calculatePriorityScore({
    citizenDemand: demand,
    urgency,
    infrastructureGap,
    populationImpact,
    vulnerability,
  });

const priority =
  priorityResult.total;

/**
 * Generate AI-powered policy
 * recommendation using Groq.
 */
const recommendation =
  await generateRecommendation({
    district,
    category,
    priority,
    citizenDemand: demand,
    urgency,
    infrastructureGap,
    populationImpact,
    vulnerability,
  });

  return {
    requestId: request.id,

    district,

    category,

    priority,

    priorityLevel:
      priorityResult.level,

    factors: {
      citizenDemand: demand,
      urgency,
      infrastructureGap,
      populationImpact,
      vulnerability,
    },

    infrastructureProfile:
      infrastructure,

    recommendation,
  };
}