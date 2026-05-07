import { NextRequest, NextResponse } from 'next/server';
import { simplifyExplanation } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { text, answerType } = await request.json();
    const simplified = await simplifyExplanation(text, answerType);
    return NextResponse.json({ simplified });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to simplify' }, { status: 500 });
  }
}