import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ScanLine,
  Lightbulb,
  Recycle,
  Radio,
  Users,
  Building2,
  Settings as SettingsIcon,
  Sprout,
  UserCircle,
} from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
  { to: '/crop-scanner', label: 'Crop Scanner', icon: ScanLine },
  { to: '/farm-advisor', label: 'Farm Advisor', icon: Lightbulb },
  { to: '/residue-intelligence', label: 'Residue Intelligence', icon: Recycle },
  { to: '/iot-monitoring', label: 'IoT Monitoring', icon: Radio },
  { to: '/community-bioenergy', label: 'Community Bioenergy', icon: Users },
  { to: '/fpo-dashboard', label: 'FPO Dashboard', icon: Building2 },
  { to: '/farm-profile', label: 'Farm Profile', icon: UserCircle },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-forest-100 bg-white h-screen sticky top-0">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-forest-100">
        <div className="rounded-lg bg-forest-700 p-1.5 text-white">
          <Sprout size={20} />
        </div>
        <span className="font-bold text-forest-950">AgriFuel AI</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1" aria-label="Main navigation">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-forest-700 text-white'
                  : 'text-forest-900/70 hover:bg-forest-50 hover:text-forest-900'
              }`
            }
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-forest-100 p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              isActive ? 'bg-forest-700 text-white' : 'text-forest-900/70 hover:bg-forest-50'
            }`
          }
        >
          <SettingsIcon size={18} aria-hidden="true" />
          Settings
        </NavLink>
      </div>
    </aside>
  )
}
