"use client";

import { useEffect, useState, useRef, CSSProperties } from "react";

interface AnimatedCounterProps {
    value: string;
    duration?: number;
    className?: string;
    style?: CSSProperties;
}

export function AnimatedCounter({ value, duration = 2000, className, style }: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState("0");
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    const rawNumber = parseInt(value.replace(/\D/g, ""), 10);
    const isPureNumberWithSpace = /^\d+(\s\d+)+$/.test(value);
    const suffix = isPureNumberWithSpace ? "" : value.replace(/[0-9]/g, "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView) return;
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeProgress * rawNumber);

            let formatted = currentCount.toString();
            if (currentCount >= 1000 || isPureNumberWithSpace) {
                formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            setDisplayValue(formatted + suffix);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView, rawNumber, duration, isPureNumberWithSpace, suffix]);

    return (
        <span ref={elementRef} className={className} style={style}>
            {displayValue}
        </span>
    );
}
