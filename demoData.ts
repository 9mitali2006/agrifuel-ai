import type {
  FarmProfile,
  SensorReading,
  VillageRecord,
  NearbyFarm,
  WeatherData,
  CropType,
} from '../types'

export const DEFAULT_FARM_PROFILE: FarmProfile = {
  farmerName: 'Ramesh Patil',
  farmName: 'Green Valley Farm',
  village: 'Baramati',
  district: 'Pune',
  state: 'Maharashtra',
  farmSize: 3.5,
  crop: 'Wheat',
  cropStage: 'Vegetative',
  sowingDate: '2026-11-15',
}

export const DEFAULT_SENSOR_READING: SensorReading = {
  temperature: 31.5,
  humidity: 68,
  soilMoisture: 32,
  gasLevel: 58,
  timestamp: new Date().toISOString(),
}

export const DEMO_WEATHER: WeatherData = {
  condition: 'Sunny',
  temperature: 31,
  humidity: 68,
  rainProbability: 10,
  windSpeed: 12,
  forecast: [
    { day: 'Mon', condition: 'Sunny', high: 32, low: 21 },
    { day: 'Tue', condition: 'Sunny', high: 33, low: 22 },
    { day: 'Wed', condition: 'PartlyCloudy', high: 31, low: 21 },
    { day: 'Thu', condition: 'PartlyCloudy', high: 30, low: 20 },
    { day: 'Fri', condition: 'Cloudy', high: 29, low: 20 },
  ],
}

export const VILLAGES: VillageRecord[] = [
  {
    village: 'Baramati',
    farmers: 82,
    areaAcres: 214,
    residueTonnes: 48,
    burningRisk: 'HIGH',
    intervention: 'Residue collection',
  },
  {
    village: 'Daund',
    farmers: 61,
    areaAcres: 176,
    residueTonnes: 31,
    burningRisk: 'MEDIUM',
    intervention: 'Community composting',
  },
  {
    village: 'Indapur',
    farmers: 94,
    areaAcres: 281,
    residueTonnes: 67,
    burningRisk: 'HIGH',
    intervention: 'Collection + biogas assessment',
  },
  {
    village: 'Shirur',
    farmers: 43,
    areaAcres: 102,
    residueTonnes: 18,
    burningRisk: 'LOW',
    intervention: 'Mulching',
  },
]

const CROPS: CropType[] = ['Wheat', 'Rice', 'Maize', 'Tomato', 'Cotton']

export const NEARBY_FARMS: NearbyFarm[] = [
  { id: 'F-101', name: 'Patil Farm', village: 'Baramati', residueTonnes: 4.6, crop: 'Wheat' },
  { id: 'F-102', name: 'Shinde Farm', village: 'Baramati', residueTonnes: 3.1, crop: 'Rice' },
  { id: 'F-103', name: 'Jadhav Farm', village: 'Baramati', residueTonnes: 2.4, crop: 'Maize' },
  { id: 'F-104', name: 'Kadam Farm', village: 'Daund', residueTonnes: 2.9, crop: 'Wheat' },
  { id: 'F-105', name: 'More Farm', village: 'Daund', residueTonnes: 1.8, crop: 'Cotton' },
  { id: 'F-106', name: 'Deshmukh Farm', village: 'Indapur', residueTonnes: 3.7, crop: 'Rice' },
  { id: 'F-107', name: 'Pawar Farm', village: 'Indapur', residueTonnes: 2.2, crop: 'Maize' },
  { id: 'F-108', name: 'Gaikwad Farm', village: 'Indapur', residueTonnes: 3.0, crop: 'Wheat' },
  { id: 'F-109', name: 'Kale Farm', village: 'Shirur', residueTonnes: 2.1, crop: 'Tomato' },
  { id: 'F-110', name: 'Bhosale Farm', village: 'Baramati', residueTonnes: 2.6, crop: CROPS[0] },
  { id: 'F-111', name: 'Nikam Farm', village: 'Shirur', residueTonnes: 1.5, crop: 'Rice' },
  { id: 'F-112', name: 'Chavan Farm', village: 'Daund', residueTonnes: 2.5, crop: 'Maize' },
]

export const TOTAL_VILLAGES_MONITORED = 24
export const TOTAL_FARMS_REGISTERED = 486
export const TOTAL_RESIDUE_AVAILABLE = 218
export const HIGH_RISK_FARMS = 37
