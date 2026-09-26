import type { WeatherData } from '../types'
import { DEMO_WEATHER } from '../data/demoData'

/**
 * Demo weather service. In a production version this would call a real
 * weather API (e.g. OpenWeather). For the hackathon prototype it returns
 * realistic static demo data and never throws, so the dashboard can
 * never break due to a weather fetch failure.
 */
export function getDemoWeather(): WeatherData {
  try {
    return DEMO_WEATHER
  } catch {
    return {
      condition: 'Sunny',
      temperature: 30,
      humidity: 65,
      rainProbability: 10,
      windSpeed: 10,
      forecast: [],
    }
  }
}
