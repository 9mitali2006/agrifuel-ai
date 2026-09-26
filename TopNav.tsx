import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Sprout } from 'lucide-react'
import { useDemoMode } from '../hooks/useDemoMode'

const mobileLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/crop-scanner', label: 'Crop Scanner' },
  { to: '/farm-advisor', label: 'Farm Advisor' },
  { to: '/residue-intelligence', label: 'Residue Intelligence' },
  { to: '/iot-monitoring', label: 'IoT Monitoring' },
  { to: '/community-bioenergy', label: 'Community Bioenergy' },
  { to: '/fpo-dashboard', label: 'FPO Dashboard' },
  { to: '/farm-profile', label: 'Farm Profile' },
  { to: '/settings', label: 'Settings' },
]

export function TopNav() {
  const { isDemo } = useDemoMode()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-forest-100">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="rounded-lg bg-forest-700 p-1.5 text-white">
            <Sprout size={18} />
          </div>
          <span className="font-bold text-forest-950">AgriFuel AI</span>
        </div>
        <div className="hidden lg:block" />
        <div className="flex items-center gap-3">
          <span className="pill bg-forest-50 text-forest-700">{isDemo ? 'Demo Mode' : 'Live Mode'}</span>
          <span className="pill bg-forest-100 text-forest-800">
            <span className="h-1.5 w-1.5 rounded-full bg-forest-600 inline-block" /> System Online
          </span>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-forest-50"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-forest-100 px-4 py-3 grid grid-cols-2 gap-2" aria-label="Mobile navigation">
          {mobileLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-forest-700 text-white' : 'bg-forest-50 text-forest-800'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
