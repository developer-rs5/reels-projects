async function gemini(message) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ]
      })
    });

    const data = await response.json();
    apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Sorry, I could not fetch a response.';
    console.log('Gemini response:', apiResponse);
  } catch (error) {
    console.error('Error fetching Gemini API response:', error.message);
    apiResponse = 'Sorry, there was an issue. Please try again later.';
  }