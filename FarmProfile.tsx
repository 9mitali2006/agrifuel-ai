import { useState } from 'react'
import { Save, RotateCcw, CheckCircle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { useFarmData } from '../hooks/useFarmData'
import type { CropType } from '../types'

const CROPS: CropType[] = ['Wheat', 'Rice', 'Maize', 'Tomato', 'Cotton']

const fields: { key: keyof ReturnType<typeof useFarmData>['profile']; label: string; type?: string }[] = [
  { key: 'farmerName', label: 'Farmer' },
  { key: 'farmName', label: 'Farm Name' },
  { key: 'village', label: 'Village' },
  { key: 'district', label: 'District' },
  { key: 'state', label: 'State' },
  { key: 'farmSize', label: 'Farm Size (acres)', type: 'number' },
  { key: 'cropStage', label: 'Crop Stage' },
  { key: 'sowingDate', label: 'Sowing Date', type: 'date' },
]

export default function FarmProfile() {
  const { profile, updateProfile, resetProfile } = useFarmData()
  const [saved, setSaved] = useState(false)

  return (
    <div>
      <PageHeader title="Farm Profile" subtitle="Edit your farm details. Changes are saved on this device." />

      <div className="card p-6 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-sm font-medium text-forest-900/70" htmlFor={f.key}>{f.label}</label>
              <input
                id={f.key}
                type={f.type ?? 'text'}
                className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm"
                value={String(profile[f.key])}
                onChange={(e) => {
                  setSaved(false)
                  const value = f.type === 'number' ? Number(e.target.value) : e.target.value
                  updateProfile({ [f.key]: value } as Partial<typeof profile>)
                }}
              />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium text-forest-900/70" htmlFor="crop">Crop</label>
            <select
              id="crop"
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm"
              value={profile.crop}
              onChange={(e) => {
                setSaved(false)
                updateProfile({ crop: e.target.value as CropType })
              }}
            >
              {CROPS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="btn-primary" onClick={() => setSaved(true)}>
            {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Saved' : 'Save Changes'}
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              resetProfile()
              setSaved(false)
            }}
          >
            <RotateCcw size={16} /> Reset Farm
          </button>
        </div>
      </div>
    </div>
  )
}
