import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { text, answerType } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const answerFormats = {
      simple: 'Simplify this into everyday language',
      twomark: 'Create a 2-mark answer format (brief, concise)',
      fivemark: 'Create a 5-mark answer format (detailed, structured)',
      tenmark: 'Create a 10-mark answer format (comprehensive, well-explained)',
      mnemonic: 'Create memorable mnemonics and memory triggers',
    };

    const format = (answerFormats as any)[answerType] || 'Simplify this';

    const prompt = `You are an exam preparation expert. ${format} for this complex text:

"${text}"

Provide a clear, exam-focused response.`;

    const result = await model.generateContent(prompt);
    const simplifiedText = result.response.text();

    return NextResponse.json({ simplified: simplifiedText });
  } catch (error) {
    console.error('Error simplifying text:', error);
    return NextResponse.json(
      { error: 'Failed to simplify explanation' },
      { status: 500 }
    );
  }
}