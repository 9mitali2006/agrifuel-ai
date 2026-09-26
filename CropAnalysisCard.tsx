import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import type { CropAssessment } from '../types'

export function CropAnalysisCard({ assessment }: { assessment: CropAssessment }) {
  return (
    <div className="card p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-forest-700 font-semibold text-sm mb-3">
          <Info size={16} /> AI-assisted assessment — not a definitive diagnosis.
        </div>
        <h3 className="text-lg font-bold text-forest-950">AI Crop Assessment</h3>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-forest-900/50">Crop</p>
            <p className="font-semibold text-forest-950">{assessment.crop}</p>
          </div>
          <div>
            <p className="text-xs text-forest-900/50">Possible Condition</p>
            <p className="font-semibold text-forest-950">{assessment.condition}</p>
          </div>
          <div>
            <p className="text-xs text-forest-900/50">Confidence</p>
            <p className="font-semibold text-forest-950">{assessment.confidence}%</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-forest-950 flex items-center gap-2 mb-2">
          <AlertTriangle size={15} className="text-amber-500" /> Observed Symptoms
        </h4>
        <ul className="space-y-1 text-sm text-forest-900/75 list-disc list-inside">
          {assessment.symptoms.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-forest-950 flex items-center gap-2 mb-2">
          <CheckCircle2 size={15} className="text-forest-600" /> Natural / Low-Risk First Steps
        </h4>
        <ol className="space-y-1 text-sm text-forest-900/75 list-decimal list-inside">
          {assessment.firstSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-800">
        {assessment.additionalAction}
      </div>
    </div>
  )
}
