import { StreamingTextResponse, streamText } from 'ai';
import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama();

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages } = await req.json();

  const result = await streamText({
    model: ollama('codellama:13b-instruct'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}
