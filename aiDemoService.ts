import type { CropAssessment, CropType } from '../types'

/**
 * AI DEMO ENGINE
 * ---------------------------------------------------------------------
 * This service simulates an AI-assisted crop assessment for the
 * hackathon prototype. It does NOT run a real machine-learning model.
 *
 * If an Anthropic API key becomes available, this file is the single
 * place to swap in a real call to the Claude API (see the commented
 * `analyzeWithClaude` stub below). Every other part of the app only
 * depends on `runCropAnalysis`, so the integration is fully isolated.
 */

interface AssessmentTemplate {
  crop: CropType
  condition: string
  confidence: number
  symptoms: string[]
  firstSteps: string[]
  additionalAction: string
}

const TEMPLATES: AssessmentTemplate[] = [
  {
    crop: 'Tomato',
    condition: 'Possible Early Blight',
    confidence: 87,
    symptoms: [
      'Brown circular spots on lower leaves',
      'Yellowing around affected areas',
      'Leaf discoloration and curling',
    ],
    firstSteps: [
      'Remove heavily affected leaves.',
      'Improve airflow between plants.',
      'Avoid prolonged leaf wetness.',
      'Monitor nearby plants.',
      'Maintain appropriate irrigation.',
    ],
    additionalAction:
      'If symptoms continue to spread, consult a local agricultural expert for confirmation and treatment guidance.',
  },
  {
    crop: 'Wheat',
    condition: 'Possible Leaf Rust',
    confidence: 82,
    symptoms: [
      'Orange-brown pustules on leaf surface',
      'Reduced leaf greenness',
      'Early leaf drying at margins',
    ],
    firstSteps: [
      'Inspect surrounding plants for spread.',
      'Avoid excess nitrogen fertilization.',
      'Ensure adequate spacing for airflow.',
      'Track progression every few days.',
      'Maintain balanced irrigation.',
    ],
    additionalAction:
      'If pustules spread rapidly across the field, consult a local agricultural expert for confirmation and treatment guidance.',
  },
  {
    crop: 'Rice',
    condition: 'Possible Brown Spot',
    confidence: 79,
    symptoms: [
      'Small brown oval lesions on leaves',
      'Dark margins with lighter centers',
      'Weakened, discolored grain heads',
    ],
    firstSteps: [
      'Check for nutrient deficiency, especially potassium.',
      'Avoid water stress during grain filling.',
      'Remove severely affected plant debris.',
      'Monitor field moisture levels.',
      'Continue regular field inspection.',
    ],
    additionalAction:
      'If spotting increases across multiple plots, consult a local agricultural expert for confirmation and treatment guidance.',
  },
  {
    crop: 'Maize',
    condition: 'Possible Leaf Blight',
    confidence: 84,
    symptoms: [
      'Long grey-green lesions on leaves',
      'Lesions turning tan with age',
      'Lower leaves affected first',
    ],
    firstSteps: [
      'Remove and destroy infected lower leaves.',
      'Rotate crops in future planting cycles.',
      'Avoid overhead irrigation late in the day.',
      'Monitor upper canopy for spread.',
      'Maintain balanced field nutrition.',
    ],
    additionalAction:
      'If blight reaches the upper canopy, consult a local agricultural expert for confirmation and treatment guidance.',
  },
  {
    crop: 'Cotton',
    condition: 'Possible Leaf Curl',
    confidence: 76,
    symptoms: [
      'Upward curling of leaf edges',
      'Thickened, leathery leaf texture',
      'Stunted new growth',
    ],
    firstSteps: [
      'Inspect for whitefly presence, a common carrier.',
      'Remove and isolate severely curled plants.',
      'Avoid water stress during flowering.',
      'Monitor neighboring plants regularly.',
      'Maintain field sanitation.',
    ],
    additionalAction:
      'If curling spreads across rows, consult a local agricultural expert for confirmation and treatment guidance.',
  },
]

function pickTemplateFromFile(fileName: string): AssessmentTemplate {
  // Deterministic pseudo-selection so the same image name always
  // produces the same demo result, while still feeling "analyzed".
  const clean = fileName.toLowerCase()
  const found = TEMPLATES.find((t) => clean.includes(t.crop.toLowerCase()))
  if (found) return found
  let hash = 0
  for (let i = 0; i < fileName.length; i++) {
    hash = (hash * 31 + fileName.charCodeAt(i)) % 997
  }
  return TEMPLATES[hash % TEMPLATES.length]
}

export function runCropAnalysis(fileName: string, imageDataUrl?: string): Promise<CropAssessment> {
  // Simulated AI processing delay for a realistic "Analyzing crop..." effect.
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const template = pickTemplateFromFile(fileName || 'crop.jpg')
        resolve({
          id: `scan-${Date.now()}`,
          crop: template.crop,
          condition: template.condition,
          confidence: template.confidence,
          symptoms: template.symptoms,
          firstSteps: template.firstSteps,
          additionalAction: template.additionalAction,
          imageDataUrl,
          createdAt: new Date().toISOString(),
        })
      } catch {
        // Fallback so image analysis never breaks the app.
        const fallback = TEMPLATES[0]
        resolve({
          id: `scan-${Date.now()}`,
          crop: fallback.crop,
          condition: fallback.condition,
          confidence: fallback.confidence,
          symptoms: fallback.symptoms,
          firstSteps: fallback.firstSteps,
          additionalAction: fallback.additionalAction,
          imageDataUrl,
          createdAt: new Date().toISOString(),
        })
      }
    }, 1800)
  })
}

/**
 * FUTURE INTEGRATION (not active in the hackathon prototype):
 *
 * export async function analyzeWithClaude(imageBase64: string) {
 *   const response = await fetch('https://api.anthropic.com/v1/messages', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       model: 'claude-sonnet-4-6',
 *       max_tokens: 1000,
 *       messages: [{
 *         role: 'user',
 *         content: [
 *           { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 } },
 *           { type: 'text', text: 'Provide an AI-assisted (not definitive) assessment of this crop leaf image.' },
 *         ],
 *       }],
 *     }),
 *   })
 *   const data = await response.json()
 *   return data
 * }
 */
