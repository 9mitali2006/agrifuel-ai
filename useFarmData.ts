import { DEFAULT_FARM_PROFILE } from '../data/demoData'
import type { FarmProfile } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useFarmData() {
  const [profile, setProfile, resetProfile] = useLocalStorage<FarmProfile>(
    'agrifuel_farm_profile',
    DEFAULT_FARM_PROFILE,
  )

  const updateProfile = (updates: Partial<FarmProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  return { profile, updateProfile, resetProfile }
}
