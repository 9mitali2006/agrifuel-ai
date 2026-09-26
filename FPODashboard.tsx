import { Building2, Users, Recycle, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { PageHeader } from '../components/PageHeader'
import { MetricCard } from '../components/MetricCard'
import { VillageTable } from '../components/VillageTable'
import { ChartCard } from '../components/ChartCard'
import {
  VILLAGES,
  TOTAL_VILLAGES_MONITORED,
  TOTAL_FARMS_REGISTERED,
  TOTAL_RESIDUE_AVAILABLE,
  HIGH_RISK_FARMS,
} from '../data/demoData'

const villagePositions: Record<string, { top: string; left: string }> = {
  Baramati: { top: '55%', left: '35%' },
  Daund: { top: '40%', left: '55%' },
  Indapur: { top: '68%', left: '50%' },
  Shirur: { top: '25%', left: '65%' },
}

const riskColor: Record<string, string> = {
  HIGH: 'bg-red-500',
  MEDIUM: 'bg-amber-500',
  LOW: 'bg-forest-500',
}

export default function FPODashboard() {
  return (
    <div>
      <PageHeader
        title="Community Agriculture Intelligence"
        subtitle="Village-level visibility for FPOs and agricultural decision-makers."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Villages Monitored" value={String(TOTAL_VILLAGES_MONITORED)} icon={Building2} tone="forest" />
        <MetricCard label="Farms Registered" value={String(TOTAL_FARMS_REGISTERED)} icon={Users} tone="sky" />
        <MetricCard label="Residue Available" value={`${TOTAL_RESIDUE_AVAILABLE} tonnes`} icon={Recycle} tone="earth" />
        <MetricCard label="High-Risk Farms" value={String(HIGH_RISK_FARMS)} icon={AlertTriangle} tone="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Residue Availability by Village" subtitle="Tonnes of estimated residue per village">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={VILLAGES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f0e9" />
              <XAxis dataKey="village" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="residueTonnes" fill="#2f6f3d" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="card p-5">
          <h3 className="font-semibold text-forest-950 mb-1">Village Cluster Map</h3>
          <p className="text-xs text-forest-900/50 mb-3">Illustrative village-cluster visualization</p>
          <div className="relative h-56 rounded-xl bg-forest-50 border border-forest-100 overflow-hidden">
            {VILLAGES.map((v) => {
              const pos = villagePositions[v.village] ?? { top: '50%', left: '50%' }
              return (
                <div
                  key={v.village}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <span className={`h-3.5 w-3.5 rounded-full ring-4 ring-white ${riskColor[v.burningRisk]}`} />
                  <span className="mt-1 text-[11px] font-medium text-forest-900 bg-white/80 rounded px-1.5">
                    {v.village}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-forest-900/60">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> High risk</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Medium</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-forest-500" /> Low</span>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-forest-950 mb-3">Village Data</h2>
      <VillageTable villages={VILLAGES} />
    </div>
  )
}
