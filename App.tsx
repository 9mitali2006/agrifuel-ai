import type { ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TopNav } from './components/TopNav'
import { ErrorBoundary } from './components/ErrorBoundary'
import Landing from './pages/Landing'
import FarmerDashboard from './pages/FarmerDashboard'
import CropScanner from './pages/CropScanner'
import FarmAdvisor from './pages/FarmAdvisor'
import ResidueIntelligence from './pages/ResidueIntelligence'
import CommunityBiogas from './pages/CommunityBiogas'
import IoTMonitoring from './pages/IoTMonitoring'
import FPODashboard from './pages/FPODashboard'
import FarmProfile from './pages/FarmProfile'
import SettingsPage from './pages/Settings'

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <TopNav />
        <main className="p-4 sm:p-6 lg:p-8">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<DashboardLayout><FarmerDashboard /></DashboardLayout>} />
      <Route path="/crop-scanner" element={<DashboardLayout><CropScanner /></DashboardLayout>} />
      <Route path="/farm-advisor" element={<DashboardLayout><FarmAdvisor /></DashboardLayout>} />
      <Route path="/residue-intelligence" element={<DashboardLayout><ResidueIntelligence /></DashboardLayout>} />
      <Route path="/community-bioenergy" element={<DashboardLayout><CommunityBiogas /></DashboardLayout>} />
      <Route path="/iot-monitoring" element={<DashboardLayout><IoTMonitoring /></DashboardLayout>} />
      <Route path="/fpo-dashboard" element={<DashboardLayout><FPODashboard /></DashboardLayout>} />
      <Route path="/farm-profile" element={<DashboardLayout><FarmProfile /></DashboardLayout>} />
      <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
