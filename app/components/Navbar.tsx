"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if at top or scrolling up
            if (currentScrollY < 100 || currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { label: "О нас", id: "about" },
        { label: "Услуги", id: "services" },
        { label: "Блог", id: "blog" },
        { label: "Франшиза", id: "franchise" },
        { label: "Контакты", id: "footer" }
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: isVisible ? 0 : -100, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 z-50 bg-white font-['TT_Runs_Trial',_sans-serif]"
            style={{
                height: '100px',
                top: '0px',
            }}
        >
            <div className="h-full w-full max-w-[1728px] mx-auto flex items-center justify-between pl-0 pr-8 md:pl-0 md:pr-12 relative">

                {/* Left: Nav Links */}
                <div className="hidden md:flex items-center h-full">
                    <div className="flex h-full">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="h-full"
                            >
                                <Link
                                    href={`#${item.id}`}
                                    className="group h-full flex items-center justify-center transition-all duration-300 relative hover:bg-[#F9F5F1]"
                                    style={{
                                        padding: '0 25px',
                                        fontFamily: '"TT Runs Trial", sans-serif',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '100%',
                                        letterSpacing: '0',
                                        color: 'rgba(22, 22, 22, 1)',
                                    }}
                                >
                                    {item.label}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C5532] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Center: Logo (Exact Positioning) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="absolute z-20 pointer-events-none hidden md:flex items-center justify-center"
                    style={{
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '14px',
                        width: '91px',
                        height: '68px'
                    }}
                >
                    <Image
                        src="/images/logo.png"
                        alt="MEDIVA CLINIC"
                        width={91}
                        height={68}
                        className="w-full h-full object-contain pointer-events-auto"
                        priority
                    />
                </motion.div>

                {/* Right: Info — Desktop */}
                <div className="hidden md:flex items-center h-full gap-4 xl:gap-6 z-10">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex items-center gap-3"
                    >
                        <button
                            className="flex items-center gap-2 px-4 py-1.5 transition-all hover:bg-[rgba(22,22,22,0.05)]"
                            style={{
                                borderRadius: '50px',
                                border: '1px solid rgba(230, 215, 200, 1)',
                                fontFamily: '"TT Runs Trial", sans-serif',
                                fontWeight: 300,
                                fontSize: '11px',
                                letterSpacing: '0.05em',
                                color: 'rgba(0, 0, 0, 1)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Image
                                src="/images/location.png"
                                alt=""
                                width={12}
                                height={12}
                                className="object-contain"
                                style={{ filter: 'invert(40%) sepia(13%) saturate(1054%) hue-rotate(328deg) brightness(96%) contrast(88%)' }}
                            />
                            <span>Ташкент, улица Абдулла Кадыри 7</span>
                        </button>

                        <button
                            className="flex items-center gap-2 px-4 py-1.5 transition-all hover:bg-[rgba(22,22,22,0.05)]"
                            style={{
                                borderRadius: '50px',
                                border: '1px solid rgba(230, 215, 200, 1)',
                                fontFamily: '"TT Runs Trial", sans-serif',
                                fontWeight: 300,
                                fontSize: '11px',
                                letterSpacing: '0.05em',
                                color: 'rgba(0, 0, 0, 1)',
                            }}
                        >
                            <span>Русский</span>
                            <Image
                                src="/images/vector.png"
                                alt=""
                                width={12}
                                height={12}
                                className="object-contain ml-1"
                            />
                        </button>
                    </motion.div>
                </div>

                {/* Mobile: Hamburger + Language */}
                <div className="md:hidden flex items-center gap-4 z-10">
                    <div className="text-[13px] tracking-widest font-light text-black opacity-80">
                        RU
                    </div>
                    <button
                        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-5 h-[1.5px] bg-[rgba(0,0,0,1)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                        <span className={`block w-5 h-[1.5px] bg-[rgba(0,0,0,1)] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-[1.5px] bg-[rgba(0,0,0,1)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Overlay Menu */}
            <div
                className={`md:hidden fixed inset-0 top-[100px] bg-white z-40 flex flex-col items-center justify-start pt-16 gap-6 transition-all duration-500 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
                    }`}
            >
                {navItems.map((item, i) => (
                    <Link
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-[rgba(0,0,0,1)] uppercase tracking-[0.15em] text-lg transition-all duration-300"
                        style={{
                            fontFamily: '"TT Runs Trial", sans-serif',
                            fontWeight: 300,
                            opacity: mobileOpen ? 1 : 0,
                            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                            transitionDelay: `${i * 80}ms`
                        }}
                    >
                        {item.label.toUpperCase()}
                    </Link>
                ))}

                <div className="mt-8 text-center text-[rgba(0,0,0,1)] text-xs opacity-70 px-4" style={{ fontFamily: '"TT Runs Trial", sans-serif' }}>
                    <p>Ташкент, улица Абдулла Кадыри 7</p>
                    <p className="mt-2 text-base font-normal">+998(97) 148-44-44</p>
                </div>
            </div>
        </motion.nav>
    );
}
