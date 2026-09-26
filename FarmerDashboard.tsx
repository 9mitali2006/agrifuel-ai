import { Thermometer, Droplets, Sprout as SoilIcon, Flame, CheckCircle2, AlertTriangle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { MetricCard } from '../components/MetricCard'
import { WeatherCard } from '../components/WeatherCard'
import { RecommendationCard } from '../components/RecommendationCard'
import { useFarmData } from '../hooks/useFarmData'
import { useSensorData } from '../hooks/useSensorData'
import { getDemoWeather } from '../services/weatherService'

export default function FarmerDashboard() {
  const { profile } = useFarmData()
  const { reading } = useSensorData()
  const weather = getDemoWeather()

  const healthScore = 82
  const circumference = 2 * Math.PI * 42

  return (
    <div>
      <PageHeader
        title={`Good Morning, ${profile.farmerName.split(' ')[0]} 👋`}
        subtitle="Here is the current status of your farm."
      />

      <div className="card p-5 mb-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <div>
          <p className="text-forest-900/50">Farm</p>
          <p className="font-semibold text-forest-950">{profile.farmName}</p>
        </div>
        <div>
          <p className="text-forest-900/50">Location</p>
          <p className="font-semibold text-forest-950">
            {profile.village}, {profile.state}
          </p>
        </div>
        <div>
          <p className="text-forest-900/50">Crop</p>
          <p className="font-semibold text-forest-950">{profile.crop}</p>
        </div>
        <div>
          <p className="text-forest-900/50">Farm Size</p>
          <p className="font-semibold text-forest-950">{profile.farmSize} acres</p>
        </div>
      </div>

      <h2 className="font-semibold text-forest-950 mb-3">Live Farm Status</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Temperature" value={`${reading.temperature.toFixed(1)}°C`} icon={Thermometer} tone="amber" />
        <MetricCard label="Humidity" value={`${Math.round(reading.humidity)}%`} icon={Droplets} tone="sky" />
        <MetricCard label="Soil Moisture" value={`${Math.round(reading.soilMoisture)}%`} icon={SoilIcon} tone="forest" status={reading.soilMoisture < 35 ? 'Slightly low' : 'Healthy'} />
        <MetricCard label="Biogas Level" value={`${Math.round(reading.gasLevel)}%`} icon={Flame} tone="earth" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-5 lg:col-span-1 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-forest-950 self-start mb-2">Farm Health</h3>
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#dcedde" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#2f6f3d"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - healthScore / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-forest-950">{healthScore}%</span>
            </div>
          </div>
          <ul className="mt-4 space-y-1.5 text-sm w-full">
            <li className="flex items-center gap-2 text-forest-900/75">
              <CheckCircle2 size={15} className="text-forest-600" /> Soil monitoring active
            </li>
            <li className="flex items-center gap-2 text-forest-900/75">
              <CheckCircle2 size={15} className="text-forest-600" /> Weather data available
            </li>
            <li className="flex items-center gap-2 text-forest-900/75">
              <CheckCircle2 size={15} className="text-forest-600" /> Crop monitoring active
            </li>
            <li className="flex items-center gap-2 text-amber-700">
              <AlertTriangle size={15} /> Soil moisture slightly low
            </li>
          </ul>
        </div>

        <div className="lg:col-span-1">
          <WeatherCard weather={weather} />
        </div>

        <div className="lg:col-span-1">
          <RecommendationCard />
        </div>
      </div>
    </div>
  )
}
