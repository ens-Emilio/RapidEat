interface BarChartProps {
    data: Array<{
        label: string;
        value: number;
        color?: string;
    }>;
    title: string;
    maxValue?: number;
}

export const BarChart = ({ data, title, maxValue }: BarChartProps) => {
    const max = maxValue || Math.max(...data.map(d => d.value));

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                {title}
            </h3>

            <div className="space-y-4">
                {data.map((item, index) => {
                    const percentage = max > 0 ? (item.value / max) * 100 : 0;
                    const barColor = item.color || 'bg-indigo-500';

                    return (
                        <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {item.label}
                                </span>
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                    {item.value}
                                </span>
                            </div>

                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                    Nenhum dado disponível
                </div>
            )}
        </div>
    );
};
