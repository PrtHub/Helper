import { BADGE_CRITERIA } from "@/lib/constant";

export interface BadgeCounts {
    GOLD: number;
    SILVER: number;
    BRONZE: number;
  }

  export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;