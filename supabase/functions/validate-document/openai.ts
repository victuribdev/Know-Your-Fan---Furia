
// Helper for OpenAI API calls
export const analyzeDocumentWithOpenAI = async (
  imageBase64: string, 
  documentType: string, 
  apiKey: string
) => {
  // Prepare system message based on document type
  let systemMessage = "You are a document validator. Analyze the provided document image and verify if it appears to be a valid identification document. ";
  if (documentType === "ID") {
    systemMessage += "Focus on elements typically found in official ID documents: photo, name, document number, official seals or watermarks. Be particularly alert for signs of tampering, inconsistencies, or photoshopping.";
  } else if (documentType === "DRIVERS_LICENSE") {
    systemMessage += "Check for standard driver's license features: photo, name, license number, issue/expiration dates, and official seals. Flag any irregularities that could indicate forgery.";
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user", 
          content: [
            { 
              type: "text", 
              text: "Please analyze this ID document and tell me if it appears to be a valid official document. Provide a detailed assessment including any potential issues or red flags. Finally, give a confidence score from 0-100% about this document's legitimacy."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    }),
  });

  return response.json();
};
