import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates text word-by-word with a blur + fade + rise effect.
 *
 * @param {string}  text           - The text to animate.
 * @param {string}  className      - Extra classes on the container <span>.
 * @param {number}  delay          - Initial delay in seconds.
 * @param {number}  duration       - Per-word animation duration.
 * @param {number}  stagger        - Stagger between words.
 * @param {boolean} animateOnMount - Skip ScrollTrigger; fire immediately on mount.
 * @param {string}  triggerStart   - GSAP ScrollTrigger start position.
 */
export default function BlurText({
    text,
    className = '',
    delay = 0,
    duration = 0.65,
    stagger = 0.09,
    animateOnMount = false,
    triggerStart = 'top 85%',
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const spans = containerRef.current.querySelectorAll('.bt-word');

            const tweenVars = {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration,
                stagger,
                ease: 'power2.out',
                delay,
            };

            if (!animateOnMount) {
                tweenVars.scrollTrigger = {
                    trigger: containerRef.current,
                    start: triggerStart,
                    once: true,
                };
            }

            gsap.fromTo(
                spans,
                { opacity: 0, filter: 'blur(10px)', y: 18 },
                tweenVars
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const words = text.split(' ');

    return (
        <span ref={containerRef} className={`inline ${className}`} aria-label={text}>
            {words.map((word, i) => (
                <span
                    key={i}
                    className="bt-word inline-block"
                    style={{ opacity: 0 }}
                    aria-hidden="true"
                >
                    {word}
                    {i < words.length - 1 && ' '}
                </span>
            ))}
        </span>
    );
}
