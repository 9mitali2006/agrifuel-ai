import { useEffect, useState } from 'react'
import type { SensorReading } from '../types'
import { DEFAULT_SENSOR_READING } from '../data/demoData'
import { getNextDemoReading } from '../services/iotService'
import { useDemoMode } from './useDemoMode'

export function useSensorData(intervalMs = 3000) {
  const { isDemo } = useDemoMode()
  const [reading, setReading] = useState<SensorReading>(DEFAULT_SENSOR_READING)
  const [pumpOn, setPumpOn] = useState(false)
  const [connected, setConnected] = useState(isDemo)

  useEffect(() => {
    setConnected(isDemo)
    if (!isDemo) return // LIVE mode: no hardware connected yet in this prototype.

    const id = setInterval(() => {
      try {
        setReading((prev) => getNextDemoReading(prev, pumpOn))
      } catch {
        // Never let simulation errors break the UI.
      }
    }, intervalMs)
    return () => clearInterval(id)
  }, [isDemo, pumpOn, intervalMs])

  const setPump = (on: boolean) => setPumpOn(on)

  return { reading, pumpOn, setPump, connected, isDemo }
}
