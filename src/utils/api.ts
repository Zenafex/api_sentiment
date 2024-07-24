export async function analyzeSentiment(text: string): Promise<any> {
    // Implementa la lógica para interactuar con tu API aquí
    // Por ejemplo, puedes usar fetch o axios para enviar el texto a la API
    const response = await fetch('/api/sentiment-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return data;
  }
  