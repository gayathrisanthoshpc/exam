'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default function ExplainSimplifierPage() {
  const [text, setText] = useState('');
  const [answerType, setAnswerType] = useState('simple');
  const [simplified, setSimplified] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimplify = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, answerType }),
      });
      const data = await response.json();
      setSimplified(data.simplified);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">AI Explain Simplifier</h1>
          <p className="text-slate-300">Paste difficult concepts. Get exam-ready explanations.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <form onSubmit={handleSimplify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Paste your difficult text
                </label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste complex concept, paragraph, or definition..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  What format do you need?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'simple', label: 'Simple Language' },
                    { value: 'twomark', label: '2-Mark Answer' },
                    { value: 'fivemark', label: '5-Mark Answer' },
                    { value: 'tenmark', label: '10-Mark Answer' },
                    { value: 'mnemonic', label: 'Mnemonics' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswerType(opt.value)}
                      className={`py-2 px-3 rounded text-sm font-medium transition-colors ${
                        answerType === opt.value
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Simplifying...' : 'Simplify'}
              </Button>
            </form>
          </Card>

          {simplified && (
            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Your Answer</h3>
              <div className="bg-slate-700 p-4 rounded text-slate-100 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {simplified}
              </div>
              <Button
                onClick={() => navigator.clipboard.writeText(simplified)}
                variant="secondary"
                className="mt-4 w-full"
              >
                Copy to Clipboard
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}