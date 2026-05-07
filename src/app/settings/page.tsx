import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Settings</h1>
          <p className="text-slate-300">Customize your experience.</p>
        </header>

        <div className="grid gap-6">
          <Card>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Theme</h3>
            <p className="text-slate-300 mb-4">Currently using dark mode for better focus.</p>
            <Button variant="outline">Toggle Theme</Button>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Notifications</h3>
            <p className="text-slate-300 mb-4">Get reminders for study sessions and exam dates.</p>
            <Button variant="outline">Configure Notifications</Button>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Data Export</h3>
            <p className="text-slate-300 mb-4">Download your study plans and notes.</p>
            <Button variant="outline">Export Data</Button>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Account</h3>
            <p className="text-slate-300 mb-4">Manage your account settings.</p>
            <Button variant="outline">Account Settings</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}