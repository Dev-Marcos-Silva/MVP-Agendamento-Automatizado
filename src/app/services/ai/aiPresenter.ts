import { systemPrompt } from "../prompt/aiPresenter"
import { chat } from "./gemini"


export async function aiPresenter(result: any): Promise<string> {
  const response = await chat.models.generateContent({
    model: 'gemini-1.5-pro',
    contents: [
      {
        role: 'user',
        parts: [
          {text: `${result}`}
        ]
      }
    ],
    config: {
      systemInstruction: `${systemPrompt}`
    }
  })

  try {
    const text = response.text
    if(!text){
      return ''
    }
    const cleanedText = text.replace(/```json|```/g, '')

    return cleanedText

  } catch (_error) {

    return 'Erro ao fazer o processo de alguma coisa'
   
  }
}

