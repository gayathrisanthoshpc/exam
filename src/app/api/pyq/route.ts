import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const text = Buffer.from(buffer).toString('utf-8');

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Analyze this previous year exam paper and identify:
1. Repeated questions or similar question patterns
2. Important units/topics that frequently appear
3. Question patterns and question types
4. Likely questions for the upcoming exam

Exam Paper:
${text}

Respond with JSON:
{
  "repeated_questions": ["question1", "question2"],
  "important_units": ["unit1", "unit2"],
  "patterns": ["pattern1", "pattern2"],
  "likely_questions": ["likely_q1", "likely_q2"],
  "analysis": "Brief analysis of the paper"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing PYQ:', error);
    return NextResponse.json(
      { error: 'Failed to analyze previous year questions' },
      { status: 500 }
    );
  }
}