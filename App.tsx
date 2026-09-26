import type { ReactNode } from 'react'

import { Routes, Route } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

import { ErrorBoundary } from './ErrorBoundary'

import Landing from './Landing'

import FarmerDashboard from './FarmerDashboard'
import CropScanner from './CropScanner'
import FarmAdvisor from './FarmAdvisor'
import ResidueIntelligence from './ResidueIntelligence'
import CommunityBiogas from './CommunityBiogas'
import IoTMonitoring from './IoTMonitoring'
import FPODashboard from './FPODashboard'
import FarmProfile from './FarmProfile'

import SettingsPage from './Settings'

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

      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <FarmerDashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/crop-scanner"
        element={
          <DashboardLayout>
            <CropScanner />
          </DashboardLayout>
        }
      />

      <Route
        path="/farm-advisor"
        element={
          <DashboardLayout>
            <FarmAdvisor />
          </DashboardLayout>
        }
      />

      <Route
        path="/residue-intelligence"
        element={
          <DashboardLayout>
            <ResidueIntelligence />
          </DashboardLayout>
        }
      />

      <Route
        path="/community-bioenergy"
        element={
          <DashboardLayout>
            <CommunityBiogas />
          </DashboardLayout>
        }
      />

      <Route
        path="/iot-monitoring"
        element={
          <DashboardLayout>
            <IoTMonitoring />
          </DashboardLayout>
        }
      />

      <Route
        path="/fpo-dashboard"
        element={
          <DashboardLayout>
            <FPODashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/farm-profile"
        element={
          <DashboardLayout>
            <FarmProfile />
          </DashboardLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <SettingsPage />
          </DashboardLayout>
        }
      />

      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
