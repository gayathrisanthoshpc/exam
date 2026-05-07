'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default function PlannerPage() {
  const [formData, setFormData] = useState({
    subject: '',
    syllabus: '',
    examDate: '',
    confidenceLevel: 'medium' as 'low' | 'medium' | 'high',
    availableHours: '',
    energyLevel: 'okay' as 'dead' | 'tired' | 'okay' | 'locked_in',
  });

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: formData.subject,
          syllabus: formData.syllabus.split(',').map((s: string) => s.trim()),
          exam_date: formData.examDate,
          confidence_level: formData.confidenceLevel,
          available_hours: parseInt(formData.availableHours),
          energy_level: formData.energyLevel,
        }),
      });
      const plan = await response.json();
      setPlan(plan);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Exam Survival Planner</h1>
          <p className="text-slate-300">Let's create a realistic plan that works for you.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="e.g., Data Structures"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Syllabus (comma-separated)</label>
                <Textarea
                  value={formData.syllabus}
                  onChange={(e) => setFormData({...formData, syllabus: e.target.value})}
                  placeholder="Topic 1, Topic 2, Topic 3..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Exam Date</label>
                <Input
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confidence Level</label>
                <select
                  value={formData.confidenceLevel}
                  onChange={(e) => setFormData({...formData, confidenceLevel: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-slate-800 text-white"
                >
                  <option value="low">Low - Haven't studied much</option>
                  <option value="medium">Medium - Some preparation</option>
                  <option value="high">High - Well prepared</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Available Study Hours per Day</label>
                <Input
                  type="number"
                  value={formData.availableHours}
                  onChange={(e) => setFormData({...formData, availableHours: e.target.value})}
                  placeholder="e.g., 3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Energy Level</label>
                <select
                  value={formData.energyLevel}
                  onChange={(e) => setFormData({...formData, energyLevel: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-slate-800 text-white"
                >
                  <option value="dead">Dead - Can't focus</option>
                  <option value="tired">Tired - Need breaks</option>
                  <option value="okay">Okay - Can study</option>
                  <option value="locked_in">Locked In - Ready to grind</option>
                </select>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Generating Plan...' : 'Generate Study Plan'}
              </Button>
            </form>
          </Card>

          {plan && (
            <Card>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Your Study Plan</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-400">High Priority Topics</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    {plan.highPriorityTopics.map((topic: string) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-emerald-400">Safe to Skip</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    {plan.safeToSkip.map((topic: string) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-emerald-400">Daily Plan</h4>
                  {plan.dailyPlan.map((day: any) => (
                    <p key={day.day} className="text-slate-300">
                      {day.day}: {day.topics.join(', ')} ({day.hours} hours)
                    </p>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium text-emerald-400">Expected Score: {plan.expectedScore}%</h4>
                  <p className="text-slate-400 text-sm">Based on your inputs and realistic expectations.</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}