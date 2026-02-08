import toast from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface CustomToastProps {
    type: ToastType;
    message: string;
    description?: string;
    onClose: () => void;
}

const CustomToast = ({ type, message, description, onClose }: CustomToastProps) => {
    const config = {
        success: {
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-50 dark:bg-green-950/30',
            border: 'border-green-200 dark:border-green-800',
        },
        error: {
            icon: XCircle,
            color: 'text-red-500',
            bg: 'bg-red-50 dark:bg-red-950/30',
            border: 'border-red-200 dark:border-red-800',
        },
        warning: {
            icon: AlertCircle,
            color: 'text-orange-500',
            bg: 'bg-orange-50 dark:bg-orange-950/30',
            border: 'border-orange-200 dark:border-orange-800',
        },
        info: {
            icon: Info,
            color: 'text-blue-500',
            bg: 'bg-blue-50 dark:bg-blue-950/30',
            border: 'border-blue-200 dark:border-blue-800',
        },
    };

    const { icon: Icon, color, bg, border } = config[type];

    return (
        <div className={`${bg} ${border} border rounded-2xl p-4 shadow-lg backdrop-blur-sm min-w-[300px] max-w-md`}>
            <div className="flex items-start gap-3">
                <Icon className={`${color} shrink-0 mt-0.5`} size={20} />

                <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {message}
                    </p>
                    {description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export const showToast = {
    success: (message: string, description?: string) => {
        toast.custom((t) => (
            <CustomToast
                type="success"
                message={message}
                description={description}
                onClose={() => toast.dismiss(t.id)}
            />
        ), { duration: 3000 });
    },

    error: (message: string, description?: string) => {
        toast.custom((t) => (
            <CustomToast
                type="error"
                message={message}
                description={description}
                onClose={() => toast.dismiss(t.id)}
            />
        ), { duration: 4000 });
    },

    warning: (message: string, description?: string) => {
        toast.custom((t) => (
            <CustomToast
                type="warning"
                message={message}
                description={description}
                onClose={() => toast.dismiss(t.id)}
            />
        ), { duration: 3500 });
    },

    info: (message: string, description?: string) => {
        toast.custom((t) => (
            <CustomToast
                type="info"
                message={message}
                description={description}
                onClose={() => toast.dismiss(t.id)}
            />
        ), { duration: 3000 });
    },
};
