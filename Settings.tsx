import { useState } from 'react'
import { RotateCcw, CheckCircle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { useFarmData } from '../hooks/useFarmData'
import { useDemoMode } from '../hooks/useDemoMode'

const statusItems = [
  { label: 'Application Online', value: '' },
  { label: 'AI Engine', value: 'Demo AI' },
  { label: 'Weather', value: 'Demo Weather' },
  { label: 'IoT', value: 'Demo Sensors' },
]

export default function SettingsPage() {
  const { resetProfile } = useFarmData()
  const { mode } = useDemoMode()
  const [resetDone, setResetDone] = useState(false)

  const resetDemoData = () => {
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith('agrifuel_'))
        .forEach((k) => window.localStorage.removeItem(k))
    } catch {
      /* localStorage unavailable — nothing to reset */
    }
    setResetDone(true)
    setTimeout(() => window.location.reload(), 600)
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="System status and demo controls." />

      <div className="card p-6 max-w-xl">
        <h3 className="font-semibold text-forest-950 mb-4">System Status</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center justify-between">
            <span className="text-forest-900/70">Application</span>
            <span className="pill bg-forest-100 text-forest-700">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-600 inline-block" /> Online
            </span>
          </li>
          {statusItems.slice(1).map((s) => (
            <li key={s.label} className="flex items-center justify-between">
              <span className="text-forest-900/70">{s.label}</span>
              <span className="pill bg-sky-50 text-sky-700">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 inline-block" /> {s.value}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between">
            <span className="text-forest-900/70">Mode</span>
            <span className="pill bg-amber-50 text-amber-700">{mode}</span>
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-forest-100 pt-5">
          <button className="btn-secondary" onClick={resetDemoData}>
            {resetDone ? <CheckCircle size={16} /> : <RotateCcw size={16} />} Reset Demo Data
          </button>
          <button className="btn-secondary" onClick={resetProfile}>
            <RotateCcw size={16} /> Reset Farm
          </button>
        </div>
      </div>
    </div>
  )
}
