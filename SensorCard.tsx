import type { LucideIcon } from 'lucide-react'

interface SensorCardProps {
  name: string
  label: string
  value: string
  sublabel?: string
  icon: LucideIcon
}

export function SensorCard({ name, label, value, sublabel, icon: Icon }: SensorCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className="pill bg-forest-50 text-forest-700 font-mono text-[11px]">{name}</span>
        <Icon size={18} className="text-forest-600" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm text-forest-900/60">{label}</p>
      <p className="text-2xl font-bold text-forest-950">{value}</p>
      {sublabel && <p className="text-xs text-forest-900/45 mt-1">{sublabel}</p>}
    </div>
  )
}
