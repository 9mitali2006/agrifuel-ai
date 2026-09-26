import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="card p-5">
      <h3 className="font-semibold text-forest-950">{title}</h3>
      {subtitle && <p className="text-xs text-forest-900/50 mb-2">{subtitle}</p>}
      <div className="mt-3 h-64">{children}</div>
    </div>
  )
}
