interface StatusBadgeProps {
  label: string
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'info'
}

const variants: Record<string, string> = {
  success: 'bg-forest-100 text-forest-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  neutral: 'bg-gray-100 text-gray-700',
  info: 'bg-sky-100 text-sky-700',
}

export function StatusBadge({ label, variant = 'neutral' }: StatusBadgeProps) {
  return <span className={`pill ${variants[variant]}`}>{label}</span>
}

export function riskVariant(risk: string): StatusBadgeProps['variant'] {
  if (risk === 'HIGH') return 'danger'
  if (risk === 'MEDIUM') return 'warning'
  return 'success'
}
