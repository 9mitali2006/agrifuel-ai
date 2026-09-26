import type { CropType } from '../types'

// Prototype coefficients only — these are illustrative demo values used to
// compute a rough residue-to-grain ratio. In a production system these
// would be calibrated against verified local agricultural research data.
export const RESIDUE_COEFFICIENTS: Record<CropType, number> = {
  Wheat: 0.9,
  Rice: 1.0,
  Maize: 0.8,
  Tomato: 0.3,
  Cotton: 1.2,
}

export function calculateEstimatedResidue(
  farmSizeAcres: number,
  yieldPerAcreTonnes: number,
  crop: CropType,
): number {
  const coefficient = RESIDUE_COEFFICIENTS[crop] ?? 0.9
  const totalYield = farmSizeAcres * yieldPerAcreTonnes
  const residue = totalYield * coefficient
  return Math.round(residue * 10) / 10
}
