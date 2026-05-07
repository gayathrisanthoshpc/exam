import { NextRequest, NextResponse } from 'next/server';
import { generateStudyPlan } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const plan = await generateStudyPlan(body);
    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}