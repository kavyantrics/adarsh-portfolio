import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configure for static export
export const dynamic = 'force-static';
export const revalidate = false;

// Initialize OpenAI client only if API key is available
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new OpenAI({ apiKey });
};

// System prompt that includes your skills, experience, and blog content
const systemPrompt = `You are a helpful AI assistant representing Adarsh, a Full Stack Developer & Designer. 
You have access to the following information:

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js
- Backend: Node.js, Python, GraphQL, REST APIs
- DevOps: Docker, Kubernetes, AWS, CI/CD
- Databases: MongoDB, PostgreSQL
- Other: Git, Agile methodologies

Experience:
- Building interactive, high-performance web applications
- Creating modern digital experiences
- Specializing in full-stack development
- Working with microservices architecture
- Implementing container orchestration

Please provide accurate and helpful responses based on this information. If you're unsure about something, say so rather than making assumptions.`;

export async function POST(req: Request) {
  try {
    const openai = getOpenAIClient();
    
    if (!openai) {
      return NextResponse.json(
        { message: 'AI chat is currently unavailable. Please check back later.' },
        { status: 503 }
      );
    }

    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const message = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 