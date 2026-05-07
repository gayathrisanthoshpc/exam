import { NextRequest, NextResponse } from 'next/server';
import { analyzePYQ } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const analysis = await analyzePYQ(text);
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze PYQ' }, { status: 500 });
  }
}