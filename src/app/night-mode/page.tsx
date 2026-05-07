'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export default function NightModePage() {
  const [notes, setNotes] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateNotes = () => {
    setLoading(true);

    // Simulate generation
    setTimeout(() => {
      setNotes({
        revisionNotes: 'Ultra-short revision notes...',
        memoryTriggers: ['Trigger 1', 'Trigger 2'],
        mnemonics: ['Mnemonic 1', 'Mnemonic 2'],
        vivaQuestions: ['Question 1', 'Question 2'],
        survivalPlan: '5-hour plan: Hour 1: Topic A, Hour 2: Topic B...',
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Night Before Exam Mode</h1>
          <p className="text-slate-300">Last-minute survival tools. You've got this.</p>
        </header>

        <div className="text-center mb-8">
          <Button onClick={generateNotes} disabled={loading} size="lg">
            {loading ? 'Generating...' : 'Generate Night Mode Kit'}
          </Button>
        </div>

        {notes && (
          <div className="grid gap-6">
            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Ultra-Short Revision Notes</h3>
              <p className="text-slate-300">{notes.revisionNotes}</p>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Memory Triggers</h3>
              <ul className="list-disc list-inside text-slate-300">
                {notes.memoryTriggers.map((trigger: string) => (
                  <li key={trigger}>{trigger}</li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Mnemonics</h3>
              <ul className="list-disc list-inside text-slate-300">
                {notes.mnemonics.map((mnemonic: string) => (
                  <li key={mnemonic}>{mnemonic}</li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Probable Viva Questions</h3>
              <ul className="list-disc list-inside text-slate-300">
                {notes.vivaQuestions.map((question: string) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">5-Hour Survival Plan</h3>
              <p className="text-slate-300">{notes.survivalPlan}</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}