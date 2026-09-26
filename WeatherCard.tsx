import { Sun, Cloud, CloudRain, CloudSun, Wind, Droplets } from 'lucide-react'
import type { WeatherData } from '../types'

const conditionIcon = {
  Sunny: Sun,
  Cloudy: Cloud,
  Rain: CloudRain,
  PartlyCloudy: CloudSun,
}

export function WeatherCard({ weather }: { weather: WeatherData }) {
  const Icon = conditionIcon[weather.condition] ?? Sun
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-forest-950">Weather</h3>
        <span className="pill bg-sky-50 text-sky-700">{weather.condition}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Icon size={40} className="text-amber-500" aria-hidden="true" />
        <div>
          <p className="text-3xl font-bold text-forest-950">{weather.temperature}°C</p>
          <p className="text-xs text-forest-900/50">Feels like current conditions</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-1.5 text-forest-900/70">
          <Droplets size={15} /> {weather.humidity}%
        </div>
        <div className="flex items-center gap-1.5 text-forest-900/70">
          <CloudRain size={15} /> {weather.rainProbability}%
        </div>
        <div className="flex items-center gap-1.5 text-forest-900/70">
          <Wind size={15} /> {weather.windSpeed} km/h
        </div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1 border-t border-forest-100 pt-3">
        {weather.forecast.map((f) => {
          const FIcon = conditionIcon[f.condition] ?? Sun
          return (
            <div key={f.day} className="flex flex-col items-center gap-1">
              <span className="text-[11px] text-forest-900/50">{f.day}</span>
              <FIcon size={16} className="text-amber-500" aria-hidden="true" />
              <span className="text-[11px] font-medium text-forest-950">{f.high}°</span>
              <span className="text-[10px] text-forest-900/40">{f.low}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
