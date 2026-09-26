import type { CropType, ResiduePlan } from '../types'
import { calculateEstimatedResidue } from '../data/residueCoefficients'

export function generateResiduePlan(
  crop: CropType,
  farmSize: number,
  yieldPerAcre: number,
  harvestDate: string,
): ResiduePlan {
  const estimatedResidue = calculateEstimatedResidue(farmSize, yieldPerAcre, crop)

  // Simple, transparent allocation split for the prototype: roughly
  // 33% mulch, 24% compost, 43% community biogas.
  const mulch = Math.round(estimatedResidue * 0.33 * 10) / 10
  const compost = Math.round(estimatedResidue * 0.24 * 10) / 10
  const biogas = Math.round((estimatedResidue - mulch - compost) * 10) / 10

  return {
    crop,
    farmSize,
    yieldPerAcre,
    harvestDate,
    estimatedResidue,
    allocations: [
      {
        label: 'Mulch',
        icon: '🌱',
        tonnes: mulch,
        description:
          'Return suitable residue to the field to support soil organic matter and moisture retention.',
      },
      {
        label: 'Compost',
        icon: '♻️',
        tonnes: compost,
        description: 'Use suitable organic residue for composting.',
      },
      {
        label: 'Community Biogas',
        icon: '🔥',
        tonnes: biogas,
        description:
          'Potentially aggregate suitable residue with nearby farms for community bioenergy.',
      },
    ],
    generatedAt: new Date().toISOString(),
  }
}
