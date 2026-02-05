import { NextRequest, NextResponse } from 'next/server';
import { getAgentResponse } from '@/lib/api/openai';

export async function POST(request: NextRequest) {
  try {
    const { systemPrompt, userMessage } = await request.json();

    if (!systemPrompt || !userMessage) {
      return NextResponse.json(
        { error: 'Missing systemPrompt or userMessage' },
        { status: 400 }
      );
    }

    const response = await getAgentResponse(systemPrompt, userMessage);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in agent-response API:', error);
    return NextResponse.json(
      { error: 'Failed to get agent response' },
      { status: 500 }
    );
  }
}
