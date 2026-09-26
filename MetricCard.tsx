import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  icon: LucideIcon
  tone?: 'forest' | 'sky' | 'earth' | 'amber'
  status?: string
}

const toneClasses: Record<string, string> = {
  forest: 'bg-forest-50 text-forest-700',
  sky: 'bg-sky-50 text-sky-700',
  earth: 'bg-earth-100 text-earth-700',
  amber: 'bg-amber-50 text-amber-700',
}

export function MetricCard({ label, value, icon: Icon, tone = 'forest', status }: MetricCardProps) {
  return (
    <div className="card p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-forest-900/60 font-medium">{label}</p>
        <p className="mt-1 text-2xl font-bold text-forest-950">{value}</p>
        {status && <p className="mt-1 text-xs text-forest-900/50">{status}</p>}
      </div>
      <div className={`rounded-xl p-2.5 ${toneClasses[tone]}`}>
        <Icon size={20} aria-hidden="true" />
      </div>
    </div>
  )
}
