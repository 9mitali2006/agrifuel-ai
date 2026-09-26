import type { ResiduePlan } from '../types'

const barColors = ['bg-forest-500', 'bg-earth-500', 'bg-amber-500']

export function ResiduePlanCard({ plan }: { plan: ResiduePlan }) {
  return (
    <div className="space-y-6">
      <div className="card p-6 text-center">
        <p className="text-sm text-forest-900/60">Estimated Residue</p>
        <p className="text-4xl font-extrabold text-forest-950 mt-1">{plan.estimatedResidue} tonnes</p>
        <p className="text-xs text-forest-900/45 mt-2">
          Prototype estimate — coefficient can be calibrated with local agricultural data.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-forest-950 mb-3">AI Residue Action Plan</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {plan.allocations.map((a) => (
            <div key={a.label} className="card p-5">
              <p className="text-2xl">{a.icon}</p>
              <p className="mt-2 font-semibold text-forest-950 uppercase text-xs tracking-wide">{a.label}</p>
              <p className="text-xl font-bold text-forest-950">{a.tonnes} tonnes</p>
              <p className="mt-2 text-xs text-forest-900/60">{a.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <p className="text-sm font-medium text-forest-900/70 mb-2">Allocation overview</p>
        <div className="flex w-full h-4 rounded-full overflow-hidden bg-forest-50">
          {plan.allocations.map((a, i) => (
            <div
              key={a.label}
              className={barColors[i % barColors.length]}
              style={{ width: `${(a.tonnes / plan.estimatedResidue) * 100}%` }}
              title={`${a.label}: ${a.tonnes}t`}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-forest-800 text-white p-5 text-sm font-medium">
        Instead of burning {plan.estimatedResidue} tonnes of residue, AgriFuel AI identifies multiple reuse
        pathways.
      </div>
    </div>
  )
}
