import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Dashboard</h1>
          <p className="text-slate-300">Welcome back. You've got this.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/planner">
            <Card className="hover:bg-slate-700 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Exam Planner</h3>
              <p className="text-slate-300">Create AI-powered study plans tailored to your situation.</p>
            </Card>
          </Link>

          <Link href="/pyq-analyzer">
            <Card className="hover:bg-slate-700 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">PYQ Analyzer</h3>
              <p className="text-slate-300">Upload previous year papers to find patterns and important topics.</p>
            </Card>
          </Link>

          <Link href="/night-mode">
            <Card className="hover:bg-slate-700 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Night Mode</h3>
              <p className="text-slate-300">Last-minute revision tools for the night before exams.</p>
            </Card>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">Recent Exams</h3>
            <p className="text-slate-400">No exams planned yet. Start with the planner.</p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">Energy Check</h3>
            <p className="text-slate-300 mb-4">How are you feeling today?</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Dead</Button>
              <Button variant="outline" size="sm">Tired</Button>
              <Button variant="outline" size="sm">Okay</Button>
              <Button variant="outline" size="sm">Locked In</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}