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
    const heightMap = {
        sm: 32,
        md: 48,
        lg: 64
    };

    const height = heightMap[size];
    // Scale width proportional to the viewBox (620x150)
    // If text is hidden, icon is roughly 180 wide in a 150 height context
    const width = showText ? (620 / 150) * height : (180 / 150) * height;
    const viewBox = showText ? "0 0 620 150" : "0 0 180 150";

    const mainColor = variant === 'empresa' ? '#6366f1' : '#FF8C00';
    const accentColor = variant === 'empresa' ? '#4338ca' : '#FF4500';

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={viewBox}
            role="img"
            aria-label="RapidEat Logo"
            className="transition-all duration-300"
        >
            <defs>
                <linearGradient id={`mainGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: mainColor, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: accentColor, stopOpacity: 1 }} />
                </linearGradient>
            </defs>

            {/* Grupo do Ícone (Prato Rápido) */}
            <g transform="translate(10, 10)">
                {/* Linhas de Velocidade */}
                <path d="M10,65 L50,65" stroke={accentColor} strokeWidth="8" strokeLinecap="round" opacity="0.6" />
                <path d="M25,85 L60,85" stroke={accentColor} strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                <path d="M5,45 L40,45" stroke={accentColor} strokeWidth="8" strokeLinecap="round" opacity="0.4" />

                {/* A Cloche (Tampa do Prato) */}
                <g transform="skewX(-15) translate(40,0)">
                    <rect x="35" y="90" width="110" height="10" rx="2" className="fill-[#333333] dark:fill-gray-100" />
                    <path d="M40,90 Q40,20 90,20 Q140,20 140,90 Z" fill={`url(#mainGradient-${variant})`} />
                    <circle cx="90" cy="20" r="8" className="fill-[#333333] dark:fill-gray-100" />
                    <path d="M60,40 Q70,30 85,35" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
                </g>
            </g>

            {showText && (
                <>
                    {/* Texto do Logo */}
                    <text x="210" y="100" className="font-sans italic font-extrabold" style={{ fontSize: '72px' }}>
                        <tspan fill={`url(#mainGradient-${variant})`}>Rapid</tspan>
                        <tspan className="fill-[#333333] dark:fill-gray-100">Eat</tspan>
                    </text>

                    {/* Slogan */}
                    <text x="350" y="130" textAnchor="middle" className="font-sans fill-gray-500 dark:fill-gray-400" style={{ fontSize: '16px', letterSpacing: '3px' }}>
                        DELIVERY
                    </text>
                </>
            )}
        </svg>
    );
};

