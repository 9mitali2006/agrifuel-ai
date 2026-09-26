export type CropType = 'Wheat' | 'Rice' | 'Maize' | 'Tomato' | 'Cotton'

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export interface FarmProfile {
  farmerName: string
  farmName: string
  village: string
  district: string
  state: string
  farmSize: number
  crop: CropType
  cropStage: string
  sowingDate: string
}

export interface SensorReading {
  temperature: number
  humidity: number
  soilMoisture: number
  gasLevel: number
  timestamp: string
}

export interface WeatherDay {
  day: string
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'PartlyCloudy'
  high: number
  low: number
}

export interface WeatherData {
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'PartlyCloudy'
  temperature: number
  humidity: number
  rainProbability: number
  windSpeed: number
  forecast: WeatherDay[]
}

export interface CropAssessment {
  id: string
  crop: CropType
  condition: string
  confidence: number
  symptoms: string[]
  firstSteps: string[]
  additionalAction: string
  imageDataUrl?: string
  createdAt: string
}

export interface FarmAdvisory {
  priority: RiskLevel
  irrigation: string
  weatherNote: string
  cropCare: string[]
  reasoning: string[]
  generatedAt: string
}

export interface ResidueAllocation {
  label: string
  icon: string
  tonnes: number
  description: string
}

export interface ResiduePlan {
  crop: CropType
  farmSize: number
  yieldPerAcre: number
  harvestDate: string
  estimatedResidue: number
  allocations: ResidueAllocation[]
  generatedAt: string
}

export interface VillageRecord {
  village: string
  farmers: number
  areaAcres: number
  residueTonnes: number
  burningRisk: RiskLevel
  intervention: string
}

export interface NearbyFarm {
  id: string
  name: string
  village: string
  residueTonnes: number
  crop: CropType
}
