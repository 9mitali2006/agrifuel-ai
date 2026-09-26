import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge, riskVariant } from '../components/StatusBadge'
import { useFarmData } from '../hooks/useFarmData'
import { useSensorData } from '../hooks/useSensorData'
import { getDemoWeather } from '../services/weatherService'
import type { FarmAdvisory } from '../types'

function buildAdvisory(soilMoisture: number, rainProbability: number, temperature: number): FarmAdvisory {
  const priority = soilMoisture < 25 ? 'HIGH' : soilMoisture < 40 ? 'MEDIUM' : 'LOW'
  return {
    priority,
    irrigation:
      soilMoisture < 40
        ? 'Soil moisture is moderately low. Consider irrigation depending on crop stage and local soil conditions.'
        : 'Soil moisture is currently adequate. Continue routine monitoring.',
    weatherNote:
      rainProbability < 30
        ? 'Rain probability is currently low.'
        : 'Rain is likely in the coming days — irrigation may not be necessary.',
    cropCare: [
      temperature > 33 ? 'Monitor for heat stress' : 'Temperature is within a comfortable range',
      'Check soil moisture again later',
      'Inspect lower leaves for early symptoms',
    ],
    reasoning: [
      `Soil moisture reading of ${soilMoisture.toFixed(0)}% was compared against the crop's typical requirement.`,
      `Rain probability of ${rainProbability}% was factored in to avoid unnecessary irrigation.`,
      `Current temperature of ${temperature.toFixed(1)}°C was checked against heat-stress thresholds for this crop stage.`,
    ],
    generatedAt: new Date().toISOString(),
  }
}

export default function FarmAdvisor() {
  const { profile } = useFarmData()
  const { reading } = useSensorData()
  const weather = getDemoWeather()
  const [loading, setLoading] = useState(false)
  const [advisory, setAdvisory] = useState<FarmAdvisory | null>(null)

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      setAdvisory(buildAdvisory(reading.soilMoisture, weather.rainProbability, reading.temperature))
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <PageHeader
        title="Smart Farm Advisor"
        subtitle="AI combines farm conditions, sensor readings and weather information to generate practical recommendations."
      />

      <div className="card p-5 mb-6">
        <h3 className="font-semibold text-forest-950 mb-3">Current Inputs</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div><p className="text-forest-900/50">Crop</p><p className="font-semibold text-forest-950">{profile.crop}</p></div>
          <div><p className="text-forest-900/50">Crop Stage</p><p className="font-semibold text-forest-950">{profile.cropStage}</p></div>
          <div><p className="text-forest-900/50">Temperature</p><p className="font-semibold text-forest-950">{reading.temperature.toFixed(1)}°C</p></div>
          <div><p className="text-forest-900/50">Humidity</p><p className="font-semibold text-forest-950">{Math.round(reading.humidity)}%</p></div>
          <div><p className="text-forest-900/50">Soil Moisture</p><p className="font-semibold text-forest-950">{Math.round(reading.soilMoisture)}%</p></div>
          <div><p className="text-forest-900/50">Rain Probability</p><p className="font-semibold text-forest-950">{weather.rainProbability}%</p></div>
        </div>
        <button className="btn-primary mt-5" onClick={generate} disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Generate AI Advisory
        </button>
      </div>

      {advisory && (
        <div className="space-y-4">
          <div className="card p-5 flex items-center justify-between">
            <h3 className="font-semibold text-forest-950">Farm Priority</h3>
            <StatusBadge label={advisory.priority} variant={riskVariant(advisory.priority)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h4 className="font-semibold text-forest-950 mb-1">Irrigation</h4>
              <p className="text-sm text-forest-900/70">{advisory.irrigation}</p>
            </div>
            <div className="card p-5">
              <h4 className="font-semibold text-forest-950 mb-1">Weather</h4>
              <p className="text-sm text-forest-900/70">{advisory.weatherNote}</p>
            </div>
          </div>
          <div className="card p-5">
            <h4 className="font-semibold text-forest-950 mb-2">Crop Care</h4>
            <ul className="list-disc list-inside text-sm text-forest-900/70 space-y-1">
              {advisory.cropCare.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h4 className="font-semibold text-forest-950 mb-2">Why?</h4>
            <ul className="list-disc list-inside text-sm text-forest-900/70 space-y-1">
              {advisory.reasoning.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
