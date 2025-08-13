// src/components/DashboardCard.tsx
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "red" | "blue" | "green" | "purple" | "orange";
  subtitle?: string;
}

const colorClasses = {
  red: {
    bg: "bg-red-100",
    text: "text-red-500",
    value: "text-red-600",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-500",
    value: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-500",
    value: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-500",
    value: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-500",
    value: "text-orange-600",
  },
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: DashboardCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${colors.bg} rounded-lg`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">{title}</div>
          <div className={`text-2xl font-bold ${colors.value}`}>{value}</div>
          {subtitle && (
            <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}
