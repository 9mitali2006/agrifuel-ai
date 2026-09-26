import type { VillageRecord } from '../types'
import { StatusBadge, riskVariant } from './StatusBadge'

export function VillageTable({ villages }: { villages: VillageRecord[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="text-left text-forest-900/50 border-b border-forest-100">
            <th className="p-4 font-medium">Village</th>
            <th className="p-4 font-medium">Farmers</th>
            <th className="p-4 font-medium">Area</th>
            <th className="p-4 font-medium">Residue</th>
            <th className="p-4 font-medium">Burning Risk</th>
            <th className="p-4 font-medium">Suggested Intervention</th>
          </tr>
        </thead>
        <tbody>
          {villages.map((v) => (
            <tr key={v.village} className="border-b border-forest-50 last:border-0 hover:bg-forest-50/40">
              <td className="p-4 font-semibold text-forest-950">{v.village}</td>
              <td className="p-4 text-forest-900/75">{v.farmers}</td>
              <td className="p-4 text-forest-900/75">{v.areaAcres} acres</td>
              <td className="p-4 text-forest-900/75">{v.residueTonnes} tonnes</td>
              <td className="p-4">
                <StatusBadge label={v.burningRisk} variant={riskVariant(v.burningRisk)} />
              </td>
              <td className="p-4 text-forest-900/75">{v.intervention}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
