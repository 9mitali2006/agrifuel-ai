import { Tractor, Recycle, MapPin } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { MetricCard } from '../components/MetricCard'
import { NEARBY_FARMS } from '../data/demoData'

export default function CommunityBiogas() {
  const totalResidue = NEARBY_FARMS.reduce((sum, f) => sum + f.residueTonnes, 0)

  return (
    <div>
      <PageHeader title="Community Bioenergy" subtitle="Coordinating residue across nearby farms for shared biogas potential." />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Nearby Farms" value={String(NEARBY_FARMS.length)} icon={Tractor} tone="forest" />
        <MetricCard label="Total Residue Available" value={`${totalResidue.toFixed(1)} tonnes`} icon={Recycle} tone="earth" />
        <MetricCard label="Potential Collection Cluster" value="Village Cluster A" icon={MapPin} tone="sky" />
      </div>

      <div className="card p-6 mb-6 overflow-x-auto">
        <h3 className="font-semibold text-forest-950 mb-4">Collection Network</h3>
        <div className="flex items-center gap-4 min-w-[640px]">
          <div className="space-y-2">
            {NEARBY_FARMS.slice(0, 5).map((f) => (
              <div key={f.id} className="pill bg-forest-50 text-forest-700 w-40 justify-start">
                <Tractor size={14} /> {f.name}
              </div>
            ))}
          </div>
          <div className="flex-1 h-px bg-forest-200 relative">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
              <span className="text-forest-400 text-2xl">→</span>
            </div>
          </div>
          <div className="pill bg-forest-700 text-white w-44 justify-center py-2">Collection Point</div>
          <div className="flex-1 h-px bg-forest-200 relative">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
              <span className="text-forest-400 text-2xl">→</span>
            </div>
          </div>
          <div className="pill bg-amber-600 text-white w-32 justify-center py-2">🔥 Biogas</div>
        </div>
      </div>

      <div className="card p-6 bg-gradient-to-br from-forest-50 to-white">
        <h3 className="font-semibold text-forest-950">Community opportunity identified</h3>
        <p className="mt-2 text-sm text-forest-900/70 max-w-2xl">
          Multiple nearby farms have potentially reusable organic residue. Coordinated collection could
          support a community bioenergy model. This is a prototype estimate — a potential opportunity based
          on aggregated residue volume, not a guaranteed biogas output.
        </p>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {NEARBY_FARMS.map((f) => (
          <div key={f.id} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-forest-950 text-sm">{f.name}</p>
              <p className="text-xs text-forest-900/50">{f.village} • {f.crop}</p>
            </div>
            <span className="pill bg-forest-50 text-forest-700">{f.residueTonnes}t</span>
          </div>
        ))}
      </div>
    </div>
  )
}
