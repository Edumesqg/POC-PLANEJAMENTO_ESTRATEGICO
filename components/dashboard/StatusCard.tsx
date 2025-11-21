import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  value: string | number;
  label: string;
}

export function StatusCard({
  icon: Icon,
  iconColor,
  iconBgColor,
  value,
  label,
}: StatusCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div
        className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl ${iconBgColor}`}
      >
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>

      <div className="space-y-1">
        <p className="text-4xl font-bold text-navy-blue">{value}</p>
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
    </div>
  );
}
