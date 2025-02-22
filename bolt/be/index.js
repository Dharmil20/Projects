import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt } from "./src/prompts.js";

async function generateResponse() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Write a code for a simple TODO application using MERN (MongoDB, Express, React.js, Node.js) tech stack.";

    const stream = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [{ text: "For all designs I ask you to make,have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hook , and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos. \n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n" }],
        },
        {
          role: 'user',
          parts: [{text}]
        }
      ],
      generationConfig: {
        temperature: 0.1,
      },
      systemInstruction: getSystemPrompt(),
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
