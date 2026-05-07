'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export default function PYQAnalyzerPage() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/pyq-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const analysis = await response.json();
      setAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing PYQ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">PYQ Analyzer</h1>
          <p className="text-slate-300">Upload or paste previous year questions to find patterns.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Paste PYQ Text</label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste the text from previous year question papers..."
                  rows={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Or Upload PDF/Image</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-slate-800 text-white"
                />
              </div>

              <Button onClick={handleAnalyze} disabled={loading || !text} className="w-full">
                {loading ? 'Analyzing...' : 'Analyze Questions'}
              </Button>
            </div>
          </Card>

          {analysis && (
            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Analysis Results</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-400">Repeated Questions</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    {analysis.repeatedQuestions.map((q: string) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-emerald-400">Important Units</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    {analysis.importantUnits.map((u: string) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-emerald-400">Common Patterns</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    {analysis.patterns.map((p: string) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-emerald-400">Likely Exam Questions</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    {analysis.likelyQuestions.map((q: string) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}