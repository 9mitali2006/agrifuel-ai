import { Thermometer, Droplets, Sprout as SoilIcon, Flame, Cpu, Power, Wifi, WifiOff } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { SensorCard } from '../components/SensorCard'
import { DemoModeToggle } from '../components/DemoModeToggle'
import { useSensorData } from '../hooks/useSensorData'

export default function IoTMonitoring() {
  const { reading, pumpOn, setPump, connected, isDemo } = useSensorData()

  return (
    <div>
      <PageHeader
        title="📡 Live IoT Farm Monitoring"
        subtitle="Sensor readings from the field, simulated in Demo Mode."
        action={<DemoModeToggle />}
      />

      <div className="card p-5 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-forest-50 p-2.5 text-forest-700">
            <Cpu size={22} />
          </div>
          <div>
            <p className="font-semibold text-forest-950">ESP32</p>
            <p className="text-xs text-forest-900/50">{isDemo ? 'Demo sensor data' : 'Waiting for ESP32 connection'}</p>
          </div>
        </div>
        <span className={`pill ${connected ? 'bg-forest-100 text-forest-700' : 'bg-gray-100 text-gray-600'}`}>
          {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
          {connected ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SensorCard name="DHT22" label="Temperature" value={`${reading.temperature.toFixed(1)}°C`} icon={Thermometer} />
        <SensorCard name="DHT22" label="Humidity" value={`${Math.round(reading.humidity)}%`} icon={Droplets} />
        <SensorCard name="Soil Sensor" label="Soil Moisture" value={`${Math.round(reading.soilMoisture)}%`} icon={SoilIcon} />
        <SensorCard name="MQ-4" label="Gas concentration indicator" value={`${Math.round(reading.gasLevel)}%`} icon={Flame} />
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sky-50 p-2.5 text-sky-700">
              <Power size={20} />
            </div>
            <div>
              <p className="font-semibold text-forest-950">Relay — Pump</p>
              <p className="text-xs text-forest-900/50">Status: {pumpOn ? 'ON' : 'OFF'}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className={`btn-primary ${pumpOn ? 'opacity-60' : ''}`}
              onClick={() => setPump(true)}
              disabled={pumpOn}
            >
              Turn Pump ON
            </button>
            <button
              className={`btn-secondary ${!pumpOn ? 'opacity-60' : ''}`}
              onClick={() => setPump(false)}
              disabled={!pumpOn}
            >
              Turn Pump OFF
            </button>
          </div>
        </div>
        {pumpOn && (
          <p className="mt-3 text-xs text-forest-700 font-medium">
            Pump is running — soil moisture is rising gradually in Demo Mode.
          </p>
        )}
      </div>
    </div>
  )
}
