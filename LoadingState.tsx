import { Loader2, Inbox, AlertCircle } from 'lucide-react'

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-forest-900/60" role="status">
      <Loader2 className="animate-spin" size={28} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-forest-900/60">
      <Inbox size={28} />
      <p className="font-semibold text-forest-950">{title}</p>
      {description && <p className="text-sm max-w-sm">{description}</p>}
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'This demo continues to work with fallback data.',
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-red-600">
      <AlertCircle size={28} />
      <p className="font-semibold">{title}</p>
      <p className="text-sm max-w-sm text-red-500">{description}</p>
    </div>
  )
}
