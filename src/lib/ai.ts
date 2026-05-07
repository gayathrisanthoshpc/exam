import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export const generateStudyPlan = async (examData: any) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Generate a realistic study plan for an exam with the following details:
  Subject: ${examData.subject}
  Syllabus: ${examData.syllabus.join(', ')}
  Exam Date: ${examData.exam_date}
  Confidence Level: ${examData.confidence_level}
  Available Hours: ${examData.available_hours}
  Energy Level: ${examData.energy_level}

  Provide high-priority topics, safe-to-skip topics, daily crash-study plan, revision schedule, and expected score potential.
  Be realistic and low-pressure.`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

export const analyzePYQ = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Analyze this previous year question paper text and extract:
  - Repeated questions
  - Important units
  - Common patterns
  - Likely exam questions

  Text: ${text}`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

export const simplifyExplanation = async (text: string, answerType: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Simplify this difficult text into a ${answerType} answer style for exams:
  ${text}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};