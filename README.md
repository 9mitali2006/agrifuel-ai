# 🌱 AgriFuel AI

**Smart Farming. Sustainable Energy. Better Decisions.**

AgriFuel AI is a hackathon prototype for a smart agricultural intelligence
platform. It connects crop health monitoring, farm sensors, weather-based
advisory, and sustainable crop-residue management into one product, with
two experiences: a **Farmer Dashboard** and an **FPO / Government
Dashboard**.

This is a **prototype**, built to run reliably with demo data and no
external services, hardware, or paid APIs.

---

## 1. Project Overview

```
SENSORS + WEATHER + FARM DATA + AI
              ↓
      AGRIFUEL AI PLATFORM
              ↓
   ACTIONABLE FARM DECISIONS
              ↓
   SUSTAINABLE RESIDUE USAGE
```

AgriFuel AI addresses three connected problems:

1. Farmers struggle to monitor crop and soil conditions in real time.
2. Crop residue is often burned instead of reused.
3. FPOs and government bodies lack village-level visibility into
   agricultural conditions and residue.

## 2. Features

- **Landing Page** — product overview and entry points into both dashboards.
- **Farmer Dashboard** — live farm status, farm health score, weather, and
  a smart irrigation recommendation.
- **AI Crop Scanner** — upload a crop photo and receive a simulated
  AI-assisted assessment (condition, confidence, symptoms, first steps).
- **Smart Farm Advisor** — generates an irrigation/crop-care advisory from
  current sensor + weather conditions, with a "Why?" explanation.
- **Residue Intelligence** — calculates estimated crop residue and splits
  it into Mulch / Compost / Community Biogas action pathways.
- **Community Bioenergy** — visualizes nearby farms contributing residue
  to a shared collection point.
- **IoT Monitoring** — live (simulated) ESP32 + DHT22 + soil + MQ-4 sensor
  readings, with a working pump ON/OFF relay control.
- **FPO / Government Dashboard** — village-level metrics, a residue bar
  chart, a village-cluster map visualization, and an intervention table.
- **Farm Profile** — editable farmer/farm details, saved to `localStorage`.
- **Settings** — system status overview and demo data reset controls.

All data shown is **realistic demo data**, not live production data.

## 3. Technology

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts (charts)
- Lucide React (icons)
- Local component state + `localStorage` (no backend, no database)

## 4. Installation

```bash
npm install
```

## 5. Running the Project

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Other useful commands:

```bash
npm run build     # type-check + production build
npm run lint      # lint the codebase
npm run preview   # preview the production build
```

No environment variables are required. The app runs fully self-contained.

## 6. Demo Mode

The entire IoT and AI experience works **without any real hardware or
external API**:

- **Crop Scanner** uses a deterministic demo AI engine
  (`src/services/aiDemoService.ts`) that returns realistic, clearly
  labeled "AI-assisted" assessments — never a false claim of a verified
  diagnosis.
- **IoT Monitoring** defaults to **Demo Mode**, where sensor values drift
  smoothly and realistically every few seconds (not randomly jumping).
  Switching to **Live Mode** shows "Waiting for ESP32 connection" and
  never breaks the app, since no real hardware is connected in this
  prototype.
- **Weather** uses static realistic demo data (`weatherService.ts`).

A **Demo Mode / Live Mode** toggle is available on the IoT Monitoring page.

## 7. Project Structure

```
src/
  components/   Reusable UI building blocks (cards, badges, nav, states)
  pages/        One file per route/page
  hooks/        useFarmData, useSensorData, useDemoMode, useLocalStorage
  data/         Demo dataset + residue coefficients
  services/     aiDemoService, weatherService, iotService, residueService
  types/        Shared TypeScript types
hardware/
  esp32_example.ino   Reference sketch for future real-hardware integration
```

## 8. ESP32 Future Integration

`hardware/esp32_example.ino` shows how a real ESP32 node (DHT22 for
temperature/humidity, a soil moisture probe, an MQ-4 gas sensor, and a
relay-driven pump) could eventually POST live JSON readings to a backend
that AgriFuel AI would then display in **Live Mode**.

The prototype **does not require this hardware to run** — it's included
purely to demonstrate the team's real-hardware integration plan.

To wire it up later:

1. Stand up a small backend endpoint that accepts the ESP32's JSON POST
   body (`temperature`, `humidity`, `soilMoisture`, `gasLevel`,
   `pumpStatus`) and exposes it to the frontend.
2. Replace the Demo Mode branch in `src/hooks/useSensorData.ts` with a
   fetch/polling call to that endpoint when `mode === 'LIVE'`.

## 9. Claude API Integration (Optional, Future)

`src/services/aiDemoService.ts` is intentionally isolated so a real
Claude API call can be dropped in later (see the commented
`analyzeWithClaude` example at the bottom of that file) without touching
any UI code. **The app must and does work fully without an API key.**

## 10. Hackathon Demo Instructions (~3 minutes)

1. Open AgriFuel AI at `/` and view the landing page.
2. Click **Explore Farmer Dashboard**.
3. Point out Temperature, Humidity, Soil Moisture, and Biogas Level cards.
4. Open **Crop Scanner**, upload any crop photo.
5. Show the AI-assisted crop assessment (condition, confidence, steps).
6. Open **Farm Advisor**, click **Generate AI Advisory**.
7. Open **Residue Intelligence**, enter Wheat / 3.5 acres / 4.2 t/acre.
8. Click **Generate Residue Plan** — show Mulch / Compost / Community
   Biogas allocation.
9. Open **Community Bioenergy** — show multiple farms feeding a shared
   collection point.
10. Open **FPO Dashboard** — show village-level metrics, chart, and map.
11. Return to **IoT Monitoring** — toggle Demo/Live Mode, turn the pump
    ON and watch soil moisture rise.

Narrative: **Farm → Sensors → AI → Crop Advice → Residue Plan →
Community Bioenergy → FPO/Government Decision Support.**

## 11. Known Limitations

- All sensor, weather, and village data is simulated for demo purposes.
- The AI crop scanner does not run a real machine-learning model — it
  returns realistic, pre-written "AI-assisted" template responses keyed
  loosely off the uploaded file name, clearly labeled as non-definitive.
- Residue coefficients are illustrative prototype values, not verified
  agronomic constants.
- The village-cluster map is a stylized visualization, not a real GIS map.
- No authentication or multi-user support — data is stored per-browser
  in `localStorage`.
