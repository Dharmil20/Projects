import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateResponse() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      "Write a code for a simple TODO application using MERN (MongoDB, Express, React.js, Node.js) tech stack.";

    const stream = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
      },
    });

    for await (const chunk of stream.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

generateResponse();
