import type { SensorReading } from '../types'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function drift(value: number, step: number, min: number, max: number) {
  const delta = (Math.random() - 0.5) * 2 * step
  return Math.round(clamp(value + delta, min, max) * 10) / 10
}

/**
 * Produces the next simulated sensor reading based on the previous one,
 * using small smooth deltas rather than fully random jumps, and taking
 * pump state into account (soil moisture rises while the pump is ON).
 */
export function getNextDemoReading(previous: SensorReading, pumpOn: boolean): SensorReading {
  try {
    const temperature = drift(previous.temperature, 0.3, 24, 38)
    const humidity = drift(previous.humidity, 1.2, 40, 90)
    let soilMoisture = pumpOn
      ? clamp(previous.soilMoisture + 1.5 + Math.random(), 0, 95)
      : drift(previous.soilMoisture, 0.8, 15, 90)
    soilMoisture = Math.round(soilMoisture * 10) / 10
    const gasLevel = drift(previous.gasLevel, 1.5, 20, 90)

    return {
      temperature,
      humidity,
      soilMoisture,
      gasLevel,
      timestamp: new Date().toISOString(),
    }
  } catch {
    // Sensor simulation must never crash the app — fall back to previous values.
    return { ...previous, timestamp: new Date().toISOString() }
  }
}
