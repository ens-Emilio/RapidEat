export const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <div
            className={`${sizeClasses[size]} border-orange-500 border-t-transparent rounded-full animate-spin`}
            role="status"
            aria-label="Carregando"
        />
    );
};

export const LoadingOverlay = ({ message = 'Carregando...' }: { message?: string }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                <Spinner size="lg" />
                <p className="text-slate-900 dark:text-slate-100 font-medium">{message}</p>
            </div>
        </div>
    );
};

export const LoadingButton = ({
    loading,
    children,
    className = '',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`relative ${className} ${loading ? 'opacity-75 cursor-wait' : ''}`}
        >
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner size="sm" />
                </div>
            )}
            <span className={loading ? 'invisible' : ''}>{children}</span>
        </button>
    );
};
