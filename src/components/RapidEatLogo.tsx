import logoImg from '../assets/001.png';

interface RapidEatLogoProps {
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    variant?: 'cliente' | 'empresa';
}

export const RapidEatLogo = ({
    size = 'sm',
    showText = true,
    variant = 'cliente'
}: RapidEatLogoProps) => {
    const sizeMap = {
        sm: { icon: 32, text: 18 },
        md: { icon: 48, text: 24 },
        lg: { icon: 64, text: 32 }
    };

    const dimensions = sizeMap[size];

    return (
        <div className="flex items-center gap-3">
            {/* Icon only - simplified version */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={dimensions.icon}
                height={dimensions.icon}
                viewBox="0 0 120 120"
                role="img"
                aria-label="RapidEat icon"
                className="transition-all duration-300"
            >
                <defs>
                    <linearGradient id={`reGrad-${variant}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={variant === 'empresa' ? '#6366f1' : '#FF8A00'} />
                        <stop offset="1" stopColor={variant === 'empresa' ? '#4338ca' : '#FF4D00'} />
                    </linearGradient>

                    <clipPath id="logoClip">
                        <rect x="0" y="0" width="120" height="120" rx="22" />
                    </clipPath>
                </defs>

                {variant === 'cliente' ? (
                    <image
                        href={logoImg}
                        width="120"
                        height="120"
                        clipPath="url(#logoClip)"
                    />
                ) : (
                    <>
                        <rect x="0" y="0" width="120" height="120" rx="22" fill={`url(#reGrad-${variant})`} />
                        {/* Fork (left) */}
                        <g transform="translate(34 32)" fill="#fff">
                            <rect x="0" y="0" width="8" height="42" rx="4" />
                            <rect x="-10" y="0" width="6" height="18" rx="3" />
                            <rect x="12" y="0" width="6" height="18" rx="3" />
                            <rect x="26" y="0" width="6" height="18" rx="3" />
                        </g>

                        {/* Knife (right) */}
                        <g transform="translate(74 28)" fill="#fff">
                            <path d="M10 0c8 10 8 28 0 38v42c0 4-3 7-7 7s-7-3-7-7V38C-2 28-2 10 6 0h4z" />
                        </g>
                    </>
                )}
            </svg>

            {/* Text */}
            {showText && (
                <span
                    className={`font-black tracking-tight transition-colors duration-300 ${variant === 'empresa' ? 'text-indigo-600 dark:text-indigo-400' : 'text-orange-600 dark:text-orange-400'
                        }`}
                    style={{ fontSize: `${dimensions.text}px` }}
                >
                    RapidEat
                </span>
            )}
        </div>
    );
};
