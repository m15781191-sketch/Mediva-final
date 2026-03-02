"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textColor = 'rgba(125, 95, 85, 1)';
    const p = Math.min(1, scrollY / 600);

    const flowerScale = 1 - p * 0.6;
    const flowerTranslateY = -p * 120;
    const titleOpacity = Math.max(0, 1 - p * 3);

    // "О НАС" floats up toward flower — limited to 220px so it doesn't overlap
    const aboutScrollProgress = Math.max(0, (p - 0.08) / 0.92);
    const aboutTranslateY = -aboutScrollProgress * 300;
    const aboutOpacity = p < 0.08 ? p / 0.08 : 1;

    const aboutChars = "О НАС".split("");
    const descWords = "Добро пожаловать в MEDIVA clinic, вашу надёжную клинику эстетической медицины в Ташкенте. С 2019 года мы занимаем лидирующие позиции на рынке медицинских услуг, предлагая комплексный подход к уходу за красотой и здоровьем.".split(" ");

    return (
        <section
            className="relative flex flex-col items-center justify-start w-full overflow-hidden"
            style={{
                backgroundColor: '#E6D7C8',
                fontFamily: '"TT Runs Trial", sans-serif',
                paddingTop: '100px', // Exact height of Navbar
                paddingBottom: '0px',
            }}
        >
            <div className="relative w-full max-w-[1728px] flex flex-col items-center">
                {/* SCROLL — Figma: 149x110px, right side, vertically centered */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: ["-50%", "-60%", "-50%"]
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 1.2 },
                        x: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 },
                        y: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.8 }
                    }}
                    className="hidden md:flex items-center justify-center uppercase"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '60px',
                        width: '149px',
                        height: '110px',
                        letterSpacing: '0.28em',
                        fontSize: '16px',
                        fontWeight: 300,
                        color: 'rgba(0, 0, 0, 1)',
                        zIndex: 10,
                        pointerEvents: 'none',
                        fontFamily: '"TT Runs Trial", sans-serif',
                        cursor: 'default',
                    }}
                >
                    SCROLL
                </motion.div>

                {/* Title Block — text-reveal mask animation */}
                <div
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        height: '260px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '18px',
                        marginTop: '75px',   /* 2cm down */
                        marginBottom: '40px',
                        padding: '0 20px',
                        opacity: titleOpacity,
                        transform: `translateY(${-p * 80}px)`,
                        zIndex: 10,
                    }}
                >
                    {["КЛИНИКА", "ЭСТЕТИЧЕСКОЙ", "МЕДИЦИНЫ", "MEDIVA"].map((word, index) => (
                        <div key={word} style={{ overflow: 'hidden' }}>
                            <motion.div
                                initial={{ y: "110%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.1 + index * 0.15
                                }}
                                className="uppercase"
                                style={{
                                    fontSize: 'clamp(24px, 5vw, 40px)', // Fluid font size
                                    lineHeight: '1.2',
                                    letterSpacing: '0.28em',
                                    color: 'rgba(125, 95, 85, 1)',
                                    fontWeight: 300,
                                    fontFamily: '"TT Runs Trial", sans-serif',
                                    textAlign: 'center',
                                }}
                            >
                                {word}
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Flower Vector — plain div for scroll transform, motion.img for fade-in */}
                <motion.div
                    className="flex justify-center items-center w-full relative z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.4 }}
                    style={{
                        maxWidth: '900px',
                        width: '85%',
                        aspectRatio: '1',
                        transform: `scale(${flowerScale}) translateY(${flowerTranslateY}px)`,
                        transformOrigin: 'center center',
                        marginBottom: '40px'
                    }}
                >
                    <Image
                        src="/images/Vector%20(2).png"
                        alt="Mediva Mandala"
                        fill
                        className="object-contain"
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                        priority
                    />
                </motion.div>


                {/* "О НАС" — PLAIN DIV — scroll transform works correctly here */}
                <div
                    className="z-10 text-center flex flex-col items-center w-full"
                    style={{
                        marginTop: '10px',
                        opacity: aboutOpacity,
                        transform: `translateY(${aboutTranslateY}px)`,
                        paddingBottom: '0px',
                        pointerEvents: aboutOpacity > 0.1 ? 'auto' : 'none',
                        transition: 'none',
                    }}
                >
                    {/* "О НАС" — character by character reveal */}
                    <h3
                        className="uppercase flex items-center justify-center text-center"
                        style={{
                            fontSize: '24px',
                            letterSpacing: '0.3em',
                            fontWeight: 400,
                            color: textColor,
                            marginBottom: '16px',
                        }}
                    >
                        <span style={{ display: 'inline-flex' }}>
                            {aboutChars.map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: '100%', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.16, 1, 0.3, 1],
                                        delay: 0.8 + i * 0.06
                                    }}
                                    style={{ display: 'inline-block', overflow: 'hidden' }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </span>
                    </h3>

                    {/* Description — word-by-word staggered fade-up */}
                    <p
                        className="flex flex-wrap items-center justify-center text-center"
                        style={{
                            width: '100%',
                            maxWidth: '739px',
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '1.6',
                            letterSpacing: '0',
                            color: textColor,
                            padding: '0 20px',
                        }}
                    >
                        {descWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 1.2 + i * 0.04
                                }}
                                style={{ display: 'inline-block', marginRight: '4px' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
}
