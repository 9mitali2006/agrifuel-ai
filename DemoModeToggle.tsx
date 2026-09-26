import { useDemoMode } from '../hooks/useDemoMode'

export function DemoModeToggle() {
  const { mode, toggleMode } = useDemoMode()
  return (
    <div className="inline-flex rounded-xl border border-forest-200 bg-white p-1 text-sm font-medium">
      <button
        className={`rounded-lg px-4 py-1.5 transition ${
          mode === 'DEMO' ? 'bg-forest-700 text-white' : 'text-forest-900/60'
        }`}
        onClick={() => mode !== 'DEMO' && toggleMode()}
      >
        Demo Mode
      </button>
      <button
        className={`rounded-lg px-4 py-1.5 transition ${
          mode === 'LIVE' ? 'bg-forest-700 text-white' : 'text-forest-900/60'
        }`}
        onClick={() => mode !== 'LIVE' && toggleMode()}
      >
        Live Mode
      </button>
    </div>
  )
}
