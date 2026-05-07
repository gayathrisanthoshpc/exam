import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Academic Damage Control
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI-powered exam survival assistant for overwhelmed college students.
            You can still recover. Let's make it happen.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-emerald-400">
              Realistic Study Planning
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li>• Smart exam survival planner with AI-generated study plans</li>
              <li>• Previous year question analyzer for pattern detection</li>
              <li>• Night-before-exam mode with ultra-short revision</li>
              <li>• AI explain simplifier for difficult concepts</li>
              <li>• Burnout-aware planning that adjusts to your energy</li>
            </ul>
          </div>
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">No Productivity Guilt</h3>
            <p className="text-slate-300 mb-4">
              This isn't about being productive. It's about surviving exams when you're behind,
              burned out, or just need realistic help.
            </p>
            <p className="text-slate-400 italic">
              "You don't need to be perfect. You just need to pass."
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="mr-4">
              Get Started
            </Button>
          </Link>
          <Link href="/planner">
            <Button variant="outline" size="lg">
              Try Planner
            </Button>
          </Link>
        </div>

        <footer className="text-center mt-16 text-slate-400">
          <p>Built with Next.js, Tailwind CSS, Supabase, and Gemini AI</p>
        </footer>
      </div>
    </div>
  );
}
