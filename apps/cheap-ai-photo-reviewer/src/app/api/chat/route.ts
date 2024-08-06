import { StreamingTextResponse, streamText } from 'ai';
import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama();

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { encodedFiles } = await req.json();
  console.log('/api/chat received an encoded file');

  const result = await streamText({
    model: ollama('llava-llama3'),
    messages: [
      {
        role: 'system',
        content: `You are a photography reviewer, you are given a photo and a request
          to review that photo. Respond with information about the color, tone, lighting,
          structure and composition of the photo. Provide helpful recommendations
          to improve the photo.`,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please provide a review of this photo as well as recommendations to improve it.',
          },
          {
            type: 'image',
            image: encodedFiles[0],
          },
        ],
      },
    ],
  });

  return new StreamingTextResponse(result.toAIStream());
}
