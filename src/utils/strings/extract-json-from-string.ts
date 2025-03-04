

export function extractJsonFromString( text: string ) {
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    return match ? match[1] : "";
  }