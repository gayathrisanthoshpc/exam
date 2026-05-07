import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/planner', label: 'Planner' },
  { href: '/pyq-analyzer', label: 'PYQ Analyzer' },
  { href: '/night-mode', label: 'Night Mode' },
  { href: '/settings', label: 'Settings' },
];

export const Navigation = () => {
  const pathname = usePathname();

  // Hide navigation on landing page
  if (pathname === '/') return null;

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-emerald-400">
            Academic DC
          </Link>

          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-slate-700 text-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};