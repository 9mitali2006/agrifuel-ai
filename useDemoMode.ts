import { useLocalStorage } from './useLocalStorage'

export type SystemMode = 'DEMO' | 'LIVE'

export function useDemoMode() {
  const [mode, setMode] = useLocalStorage<SystemMode>('agrifuel_mode', 'DEMO')
  const toggleMode = () => setMode((m) => (m === 'DEMO' ? 'LIVE' : 'DEMO'))
  return { mode, setMode, toggleMode, isDemo: mode === 'DEMO' }
}
