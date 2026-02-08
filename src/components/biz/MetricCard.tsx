import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    color?: 'orange' | 'blue' | 'green' | 'purple' | 'red';
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export const MetricCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = 'orange',
    trend
}: MetricCardProps) => {
    const colorClasses = {
        orange: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400',
        blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
        green: 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400',
        purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
        red: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`text-sm font-bold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </div>
                )}
            </div>

            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
                    {title}
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">
                    {value}
                </p>
                {subtitle && (
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};
