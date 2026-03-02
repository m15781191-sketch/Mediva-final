"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type Item = { id: number; title: string; image: string };

const EQUIPMENT: Item[] = [
    { id: 1, title: "ULTRAFORMER III", image: "/images/image1.png" },
    { id: 2, title: "ULFIT", image: "/images/image2.png" },
    { id: 3, title: "BTL-MICRO FUSION", image: "/images/image3.png" },
    { id: 4, title: "BTL MFUSION", image: "/images/image4.png" },
];

export default function EquipmentSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const prev = () =>
        setActiveIndex((p) => (p === 0 ? EQUIPMENT.length - 1 : p - 1));
    const next = () =>
        setActiveIndex((p) => (p === EQUIPMENT.length - 1 ? 0 : p + 1));

    return (
        <section className="relative w-full" style={{ backgroundColor: "#E6D7C8" }}>
            <div
                className="relative mx-auto flex flex-col items-center px-4 md:px-8"
                style={{ maxWidth: "1920px", paddingTop: "60px", paddingBottom: "60px" }}
            >
                {/* TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center uppercase mb-8 md:mb-14"
                    style={{
                        fontFamily: "'TT Runs Trial', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(24px, 4vw, 40px)",
                        lineHeight: "1.35",
                        letterSpacing: "0.2em",
                        color: "rgba(125, 95, 85, 1)",
                    }}
                >
                    ОБОРУДОВАНИЕ
                </motion.h2>

                {/* CARDS — Horizontal scroll on mobile, flex on desktop */}
                <div className="w-full overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                    <div className="flex justify-start md:justify-center gap-4 md:gap-[24px] mb-6 md:mb-[32px] min-w-max md:min-w-0 px-4 md:px-0">
                        {EQUIPMENT.map((item, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <motion.div
                                    key={item.id}
                                    onClick={() => setActiveIndex(i)}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="flex-shrink-0"
                                    style={{
                                        width: "clamp(220px, 25vw, 360px)",
                                        height: "clamp(300px, 33vw, 480px)",
                                        backgroundColor: "#DBC6B4",
                                        borderRadius: 0,
                                        position: "relative",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                    }}
                                >
                                    {/* CARD TITLE */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "16px",
                                            left: 0,
                                            right: 0,
                                            fontFamily: "'TT Runs Trial', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "clamp(12px, 1.5vw, 18px)",
                                            lineHeight: "24px",
                                            color: "rgba(0,0,0,1)",
                                            textTransform: "uppercase",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        {item.title}
                                    </div>

                                    {/* IMAGE */}
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                            style={{
                                                padding: "24px 8px 4px 8px",
                                                transform: "scale(1.06)",
                                                transformOrigin: "center bottom",
                                                objectPosition: "center bottom",
                                                filter: isActive ? "none" : "grayscale(0.2) opacity(0.8)"
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ARROWS — below cards, centered */}
                <div className="flex items-center justify-center gap-[16px] mb-[24px]">
                    <button
                        onClick={prev}
                        className="transition-all opacity-50 hover:opacity-100"
                        style={{ color: 'rgba(125, 95, 85, 1)' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className="transition-all opacity-50 hover:opacity-100"
                        style={{ color: 'rgba(125, 95, 85, 1)' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* VIEW ALL */}
                <a
                    href="#"
                    className="text-center"
                    style={{
                        fontFamily: "'TT Runs Trial', sans-serif",
                        fontWeight: 300,
                        fontSize: "12px",
                        lineHeight: "20px",
                        letterSpacing: "0.2em",
                        color: "rgba(125, 95, 85, 1)",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(125, 95, 85, 1)",
                        paddingBottom: "4px",
                    }}
                >
                    ПОСМОТРЕТЬ ВСЕ ОБОРУДОВАНИЕ
                </a>
            </div>
        </section>
    );
}
