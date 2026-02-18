export const SkeletonCard = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            {/* Image skeleton */}
            <div className="h-48 skeleton-premium" />

            {/* Content skeleton */}
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                    <div className="h-6 skeleton-premium rounded w-3/4" />
                    <div className="h-5 w-5 skeleton-premium rounded-full" />
                </div>

                <div className="space-y-2">
                    <div className="h-4 skeleton-premium rounded w-full" />
                    <div className="h-4 skeleton-premium rounded w-2/3" />
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="h-6 skeleton-premium rounded w-20" />
                    <div className="h-10 skeleton-premium rounded-xl w-32" />
                </div>
            </div>
        </div>
    );
};

export const SkeletonMetricCard = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 skeleton-premium rounded-xl" />
            </div>

            <div className="space-y-2">
                <div className="h-4 skeleton-premium rounded w-24" />
                <div className="h-8 skeleton-premium rounded w-32" />
                <div className="h-3 skeleton-premium rounded w-20" />
            </div>
        </div>
    );
};

export const SkeletonPedido = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
                <div className="h-4 skeleton-premium rounded w-32" />
                <div className="h-4 skeleton-premium rounded w-20" />
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
                <div className="h-4 skeleton-premium rounded w-full" />
                <div className="h-4 skeleton-premium rounded w-5/6" />
                <div className="h-4 skeleton-premium rounded w-4/6" />

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="h-6 skeleton-premium rounded w-24" />
                </div>
            </div>
        </div>
    );
};

export const SkeletonList = ({ count = 3, type = 'card' }: { count?: number; type?: 'card' | 'metric' | 'pedido' }) => {
    const SkeletonComponent = {
        card: SkeletonCard,
        metric: SkeletonMetricCard,
        pedido: SkeletonPedido,
    }[type];

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonComponent key={i} />
            ))}
        </>
    );
};

