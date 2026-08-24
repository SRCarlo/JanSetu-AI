import {
  PRIORITY_WEIGHTS,
} from "../config/priority.config.js";

import type {
  PriorityInput,
  PriorityScore,
} from "../types/priority.types.js";

function clamp(
  value: number,
  min = 0,
  max = 100
) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

function round(
  value: number,
  decimals = 2
) {
  const multiplier =
    Math.pow(10, decimals);

  return (
    Math.round(value * multiplier) /
    multiplier
  );
}

function getPriorityLevel(
  score: number
): PriorityScore["level"] {
  if (score >= 80) {
    return "CRITICAL";
  }

  if (score >= 60) {
    return "HIGH";
  }

  if (score >= 40) {
    return "MEDIUM";
  }

  return "LOW";
}

export function calculatePriorityScore(
  input: PriorityInput
): PriorityScore {
  const citizenDemand =
    clamp(input.citizenDemand);

  const urgency =
    clamp(input.urgency);

  const infrastructureGap =
    clamp(input.infrastructureGap);

  const populationImpact =
    clamp(input.populationImpact);

  const vulnerability =
    clamp(input.vulnerability);

  const total =
    citizenDemand *
      PRIORITY_WEIGHTS.citizenDemand +

    urgency *
      PRIORITY_WEIGHTS.urgency +

    infrastructureGap *
      PRIORITY_WEIGHTS.infrastructureGap +

    populationImpact *
      PRIORITY_WEIGHTS.populationImpact +

    vulnerability *
      PRIORITY_WEIGHTS.vulnerability;

  const finalScore =
    round(clamp(total));

  return {
    total: finalScore,

    citizenDemand,

    urgency,

    infrastructureGap,

    populationImpact,

    vulnerability,

    level:
      getPriorityLevel(finalScore),
  };
}