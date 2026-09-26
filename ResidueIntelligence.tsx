import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { ResiduePlanCard } from '../components/ResiduePlanCard'
import { generateResiduePlan } from '../services/residueService'
import { useFarmData } from '../hooks/useFarmData'
import type { CropType, ResiduePlan } from '../types'

const CROPS: CropType[] = ['Wheat', 'Rice', 'Maize', 'Tomato', 'Cotton']

export default function ResidueIntelligence() {
  const { profile } = useFarmData()
  const [crop, setCrop] = useState<CropType>(profile.crop)
  const [farmSize, setFarmSize] = useState(profile.farmSize)
  const [yieldPerAcre, setYieldPerAcre] = useState(4.2)
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<ResiduePlan | null>(null)

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      setPlan(generateResiduePlan(crop, farmSize, yieldPerAcre, harvestDate))
      setLoading(false)
    }, 900)
  }

  return (
    <div>
      <PageHeader
        title="♻️ AI Residue Intelligence"
        subtitle="Turn agricultural residue into a resource instead of burning it."
      />

      <div className="card p-5 mb-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-forest-900/70" htmlFor="crop">Crop</label>
            <select
              id="crop"
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm"
              value={crop}
              onChange={(e) => setCrop(e.target.value as CropType)}
            >
              {CROPS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-forest-900/70" htmlFor="size">Farm Size (acres)</label>
            <input
              id="size"
              type="number"
              min={0.1}
              step={0.1}
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm"
              value={farmSize}
              onChange={(e) => setFarmSize(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-forest-900/70" htmlFor="yield">Estimated Yield (t/acre)</label>
            <input
              id="yield"
              type="number"
              min={0.1}
              step={0.1}
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm"
              value={yieldPerAcre}
              onChange={(e) => setYieldPerAcre(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-forest-900/70" htmlFor="harvest">Harvest Date</label>
            <input
              id="harvest"
              type="date"
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-primary mt-5" onClick={generate} disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Generate Residue Plan
        </button>
      </div>

      {plan && <ResiduePlanCard plan={plan} />}
    </div>
  )
}
