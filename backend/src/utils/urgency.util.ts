export function urgencyToScore(
  urgency: string
): number {
  switch (
    urgency.toUpperCase()
  ) {
    case "CRITICAL":
      return 100;

    case "HIGH":
      return 80;

    case "MEDIUM":
      return 60;

    case "LOW":
      return 30;

    default:
      return 50;
  }
}