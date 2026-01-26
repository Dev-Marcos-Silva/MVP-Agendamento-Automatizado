import { systemPrompt } from "../prompt/aiInterpretation"
import { chat } from "./gemini"

type AiIntent =
 | 'CREATE_APPOINTMENT'
 | 'CANCEL_APPOINTMENT'
 | 'GET_APPOINTMENT'
 | 'LIST_SERVICES'
 | 'LIST_TIMES'
 | 'UNKNOWN'

export type AiData = {
  appointmentId: string | null
  client: string | null
  phone: string | null
  date: string | null
  startTime: string | null
  endTime: string | null
  serviceId: string | null
  status: string | null
}

export interface AiResult {
  intent: AiIntent
  data: AiData | null
}

export async function aiInterpretation(message: string): Promise<AiResult> {
  const response = await chat.models.generateContent({
    model: 'gemini-1.5-pro',
    contents: [
      {
        role: 'user',
        parts: [
          {text: `${message}`}
        ]
      }
    ],
    config: {
      systemInstruction: `${systemPrompt}`
    }
  })

  try {
    const text = response.text

    if (!text) {
      return {
        intent: 'UNKNOWN',
        data: null,
      }
    }

    const cleanedText = text.replace(/```json|```/g, '')

    console.log('resulrado', cleanedText)

    return JSON.parse(cleanedText)
  } catch (_error) {
    return {
      intent: 'UNKNOWN',
      data: null,
    }
  }
}
