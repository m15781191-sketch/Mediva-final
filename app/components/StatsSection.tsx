"use client";

import { AnimatedCounter } from "./ui/animated-counter";

export default function StatsSection() {
    const stats = [
        { value: "30 000", label: "Довольных пациентов" },
        { value: "7 ЛЕТ", label: "в рынке Узбекистана" },
        { value: "35", label: "Врачей и Специалистов" },
        { value: "5*", label: "Статус клиники" },
    ];

    return (
        <section
            className="flex flex-col items-center justify-center w-full"
            style={{
                backgroundColor: '#E6D7C8',
                height: '728px',
                width: '100%',
                position: 'relative'
            }}
        >
            <div
                className="flex flex-col items-center justify-center space-y-12 w-full max-w-[1728px]"
            >
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <AnimatedCounter
                            value={stat.value}
                            duration={800}
                            className="tracking-[0.1em]"
                            style={{
                                fontFamily: '"TT Runs Trial", sans-serif',
                                fontWeight: 300,
                                fontSize: '60px',
                                lineHeight: '100%',
                                letterSpacing: '0',
                                textTransform: 'uppercase' as const,
                                color: 'rgba(125, 95, 85, 1)',
                            }}
                        />
                        <span
                            className="mt-4"
                            style={{
                                fontFamily: '"TT Runs Trial", sans-serif',
                                fontWeight: 400,
                                fontSize: '18px',
                                lineHeight: '100%',
                                color: 'rgba(125, 95, 85, 1)',
                            }}
                        >
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
