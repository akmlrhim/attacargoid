import { useEffect, useRef } from 'react';

export default function useScrollReveal(threshold = 0.12) {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        const els = root.querySelectorAll('.sr');
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}
