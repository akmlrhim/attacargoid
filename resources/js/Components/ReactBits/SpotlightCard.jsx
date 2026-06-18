import { useRef, useState, useCallback } from 'react';

/**
 * Wraps children in a card that shows a radial spotlight at the cursor position.
 *
 * @param {string} className       - Extra classes applied to the wrapper div.
 * @param {string} spotlightColor  - CSS color for the spotlight (rgba recommended).
 * @param {number} spotlightSize   - Radius of the spotlight in pixels.
 */
export default function SpotlightCard({
    children,
    className = '',
    style,
    spotlightColor = 'rgba(245, 166, 35, 0.08)',
    spotlightSize = 280,
}) {
    const cardRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = useCallback((e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, []);

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
                }}
            />
            {children}
        </div>
    );
}
