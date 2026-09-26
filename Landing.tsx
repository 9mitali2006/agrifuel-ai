import { Link } from 'react-router-dom'
import { Sprout, Radio, Flame, LayoutDashboard, ArrowRight, PlayCircle } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      <header className="flex items-center justify-between px-6 sm:px-10 py-5">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-forest-700 p-1.5 text-white">
            <Sprout size={20} />
          </div>
          <span className="font-bold text-lg text-forest-950">AgriFuel AI</span>
        </div>
        <Link to="/dashboard" className="btn-secondary">
          Launch Demo
        </Link>
      </header>

      <main className="px-6 sm:px-10">
        <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-20">
          <div>
            <span className="pill bg-forest-100 text-forest-700 mb-4">Hackathon Prototype</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-950 leading-tight">
              AGRI FUEL AI
            </h1>
            <p className="mt-3 text-lg font-medium text-forest-700">
              Smart Farming. Sustainable Energy. Better Decisions.
            </p>
            <p className="mt-4 text-forest-900/70 max-w-lg">
              An AI-powered agricultural intelligence platform connecting crop health, farm sensors,
              weather insights and sustainable crop-residue management.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="btn-primary">
                Explore Farmer Dashboard <ArrowRight size={16} />
              </Link>
              <Link to="/fpo-dashboard" className="btn-secondary">
                View Community Dashboard
              </Link>
              <Link to="/dashboard" className="btn-secondary">
                <PlayCircle size={16} /> Launch Demo
              </Link>
            </div>
          </div>

          <div className="card p-6 relative overflow-hidden">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-forest-50 p-4 flex flex-col items-center text-center">
                <Sprout size={28} className="text-forest-700" />
                <p className="mt-2 text-sm font-semibold text-forest-950">Crop Fields</p>
                <p className="text-xs text-forest-900/50">Wheat • Rice • Maize</p>
              </div>
              <div className="rounded-xl bg-sky-50 p-4 flex flex-col items-center text-center">
                <Radio size={28} className="text-sky-700" />
                <p className="mt-2 text-sm font-semibold text-forest-950">IoT Sensor</p>
                <p className="text-xs text-forest-900/50">ESP32 + DHT22</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-4 flex flex-col items-center text-center">
                <LayoutDashboard size={28} className="text-amber-700" />
                <p className="mt-2 text-sm font-semibold text-forest-950">AI Dashboard</p>
                <p className="text-xs text-forest-900/50">Real-time insights</p>
              </div>
              <div className="rounded-xl bg-earth-100 p-4 flex flex-col items-center text-center">
                <Flame size={28} className="text-earth-700" />
                <p className="mt-2 text-sm font-semibold text-forest-950">Biogas</p>
                <p className="text-xs text-forest-900/50">Residue reuse</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-forest-800 text-white p-4 text-sm text-center font-medium">
              Sensors + Weather + Farm Data + AI → Actionable Farm Decisions
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-6 pb-20">
          {[
            {
              title: 'AI Crop Scanning',
              desc: 'Upload a crop photo for an instant AI-assisted health assessment.',
            },
            {
              title: 'Residue Intelligence',
              desc: 'Turn crop residue into mulch, compost and community biogas instead of burning it.',
            },
            {
              title: 'FPO & Govt Visibility',
              desc: 'Village-level dashboards give FPOs and officials real-time agricultural insight.',
            },
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="font-semibold text-forest-950">{f.title}</h3>
              <p className="mt-2 text-sm text-forest-900/65">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="text-center text-xs text-forest-900/40 py-6">
        AgriFuel AI — Hackathon prototype. All data shown is simulated demo data.
      </footer>
    </div>
  )
}
