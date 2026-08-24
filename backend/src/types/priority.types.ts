export interface PriorityInput {
  citizenDemand: number;
  urgency: number;
  infrastructureGap: number;
  populationImpact: number;
  vulnerability: number;
}

export interface PriorityScore {
  total: number;

  citizenDemand: number;
  urgency: number;
  infrastructureGap: number;
  populationImpact: number;
  vulnerability: number;

  level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}