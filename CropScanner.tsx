import { useRef, useState } from 'react'
import { Camera, RotateCcw, Save, CheckCircle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { CropAnalysisCard } from '../components/CropAnalysisCard'
import { runCropAnalysis } from '../services/aiDemoService'
import type { CropAssessment } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function CropScanner() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [assessment, setAssessment] = useState<CropAssessment | null>(null)
  const [saved, setSaved] = useState(false)
  const [, setSavedAssessments] = useLocalStorage<CropAssessment[]>('agrifuel_assessments', [])

  const handleFile = (file: File) => {
    setSaved(false)
    setAssessment(null)
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : undefined
      setImagePreview(dataUrl ?? null)
      setAnalyzing(true)
      runCropAnalysis(file.name, dataUrl)
        .then(setAssessment)
        .finally(() => setAnalyzing(false))
    }
    reader.onerror = () => {
      // Never let a broken file read crash the app.
      setAnalyzing(false)
    }
    reader.readAsDataURL(file)
  }

  const reset = () => {
    setImagePreview(null)
    setAssessment(null)
    setFileName('')
    setSaved(false)
  }

  const save = () => {
    if (!assessment) return
    setSavedAssessments((prev) => [assessment, ...prev].slice(0, 20))
    setSaved(true)
  }

  return (
    <div>
      <PageHeader title="AI Crop Scanner" subtitle="Upload a crop image to receive an AI-assisted assessment." />

      {!imagePreview && (
        <label className="card flex flex-col items-center justify-center gap-3 py-16 border-2 border-dashed border-forest-200 cursor-pointer hover:border-forest-400 transition">
          <Camera size={40} className="text-forest-400" aria-hidden="true" />
          <p className="font-semibold text-forest-950">Upload crop image</p>
          <p className="text-sm text-forest-900/50">JPG / PNG</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            aria-label="Upload crop image"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
        </label>
      )}

      {imagePreview && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-4">
            <img
              src={imagePreview}
              alt={`Uploaded crop photo: ${fileName}`}
              className="w-full h-80 object-cover rounded-xl"
            />
            {analyzing && (
              <div className="relative mt-4 rounded-xl bg-forest-50 h-2 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-forest-600 animate-pulse-soft rounded-xl" />
              </div>
            )}
            <p className="mt-3 text-sm font-medium text-forest-900/70">
              {analyzing ? 'Analyzing crop...' : 'Analysis complete'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="btn-secondary" onClick={reset}>
                <RotateCcw size={16} /> Scan Another Crop
              </button>
              <button className="btn-primary" onClick={save} disabled={!assessment || saved}>
                {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Saved' : 'Save Assessment'}
              </button>
            </div>
          </div>

          <div>
            {analyzing && (
              <div className="card p-6 flex flex-col items-center justify-center gap-3 h-full text-forest-900/60">
                <div className="w-10 h-10 border-4 border-forest-200 border-t-forest-700 rounded-full animate-spin" />
                <p className="text-sm font-medium">Analyzing crop...</p>
              </div>
            )}
            {!analyzing && assessment && <CropAnalysisCard assessment={assessment} />}
          </div>
        </div>
      )}
    </div>
  )
}
