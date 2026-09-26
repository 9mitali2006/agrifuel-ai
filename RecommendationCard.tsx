import { Link } from 'react-router-dom'
import { Droplets, ArrowRight } from 'lucide-react'

interface RecommendationCardProps {
  title?: string
  message?: string
  to?: string
  ctaLabel?: string
}

export function RecommendationCard({
  title = 'Irrigation Attention',
  message = 'Soil moisture is trending downward and no significant rainfall is expected. Consider irrigation based on crop stage and local soil conditions.',
  to = '/farm-advisor',
  ctaLabel = 'View Farm Advisory',
}: RecommendationCardProps) {
  return (
    <div className="card p-5 bg-gradient-to-br from-forest-50 to-white border-forest-200">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-forest-600 text-white p-2.5 shrink-0">
          <Droplets size={20} aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-forest-950">💧 {title}</h3>
          <p className="mt-1 text-sm text-forest-900/70">{message}</p>
          <Link to={to} className="btn-primary mt-3 inline-flex">
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
