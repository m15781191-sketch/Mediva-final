'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const VIDEO_SRC = "/images/IMG_5260.MOV";

const ITEMS = [
    {
        id: 1,
        image: "/images/Frame 41.png",
        video: VIDEO_SRC,
        sub: "современный способ избавления от нежелательных волос",
        title: "Лазерная эпиляция",
    },
    {
        id: 2,
        image: "/images/Frame 40.png",
        video: VIDEO_SRC,
        sub: "мгновенная подтяжка и омоложение кожи",
        title: "MPT LIFTING",
    },
    {
        id: 3,
        image: "/images/Frame 42 (1).png",
        video: VIDEO_SRC,
        sub: "Лифтинг",
        title: "ЛИЦО",
    },
];

const FONT = '"TT Runs Trial Variable Roman", "TT Runs Trial", sans-serif';
const ACCENT = 'rgba(125, 95, 85, 1)';

const LABEL_TITLE_STYLE: React.CSSProperties = {
    fontFamily: FONT,
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '100%',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
};

const LABEL_SUB_STYLE: React.CSSProperties = {
    fontFamily: FONT,
    fontWeight: 300,
    fontSize: '16px',
    lineHeight: '100%',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
};

/* Center card dimensions (active/focused) - 9:16 Ratio approx */
const CENTER_W = 490;
const CENTER_H = 872;

const renderCardLabel = (item: any, isCenter: boolean = false) => {
    if (item.id === 3) {
        return (
            <div style={{
                position: 'absolute',
                bottom: isCenter ? '80px' : '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                pointerEvents: 'none'
            }}>
                <div style={{ ...LABEL_SUB_STYLE, fontSize: isCenter ? '24px' : '18px', color: 'rgba(0,0,0,0.6)' }}>{item.sub}</div>
                <div style={{ ...LABEL_TITLE_STYLE, fontSize: isCenter ? '100px' : '64px', letterSpacing: '0.4em', marginLeft: '0.4em' }}>{item.title}</div>
            </div>
        );
    }
    return (
        <div style={{
            position: 'absolute',
            bottom: isCenter ? '80px' : '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isCenter ? '12px' : '8px',
            pointerEvents: 'none',
            padding: isCenter ? '0' : '0 20px'
        }}>
            <div style={{ ...LABEL_TITLE_STYLE, fontSize: isCenter ? '32px' : '24px' }}>{item.title}</div>
            <div style={{ ...LABEL_SUB_STYLE, fontSize: isCenter ? '16px' : '10px', maxWidth: isCenter ? '280px' : '200px' }}>{item.sub}</div>
        </div>
    );
};

/* Side card dimensions (background) */
const SIDE_W = 364;
const SIDE_H = 646;

const GAP = 10;

/* Directional Cinematic Slide variants */
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '120%' : '-120%',
        opacity: 0,
        scale: 0.8,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        zIndex: 30,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? '-120%' : '120%',
        opacity: 0,
        scale: 0.8,
    }),
};

const cinematicTransition = {
    x: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    scale: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
};

export default function ProceduresSection() {
    const [[activeIndex, direction], setPage] = useState([1, 0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [titleVisible, setTitleVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const mod = (n: number, m: number) => ((n % m) + m) % m;

    const paginate = useCallback((newDirection: number) => {
        setIsPlaying(false);
        setPage(([prev]) => [mod(prev + newDirection, ITEMS.length), newDirection]);
    }, []);

    const togglePlay = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play().catch(err => {
                console.warn("Play blocked:", err);
            });
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    }, []);

    const toggleMute = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    }, []);

    const handleSeek = useCallback((e: React.MouseEvent | MouseEvent) => {
        const video = videoRef.current;
        if (!video || !duration) return;

        const seekContainer = document.getElementById('seekbar-container');
        if (!seekContainer) return;

        const rect = seekContainer.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const clickedPos = x / rect.width;
        video.currentTime = clickedPos * duration;
    }, [duration]);

    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (isDragging) {
            const onMouseMove = (e: MouseEvent) => handleSeek(e);
            const onMouseUp = () => setIsDragging(false);

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };
        }
    }, [isDragging, handleSeek]);

    // Handle video metadata and time updates
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
        };
    }, [activeIndex]);

    // Title fade-in on mount
    useEffect(() => {
        const timer = setTimeout(() => setTitleVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Subtle parallax effect on mouse move
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const maxShift = 6;
        const x = ((e.clientX - centerX) / (rect.width / 2)) * maxShift;
        const y = ((e.clientY - centerY) / (rect.height / 2)) * maxShift;
        setParallax({ x, y });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setParallax({ x: 0, y: 0 });
    }, []);

    const leftIdx = mod(activeIndex - 1, ITEMS.length);
    const rightIdx = mod(activeIndex + 1, ITEMS.length);

    /* Calculate positions so center card is centered, sides flanking */
    const totalW = SIDE_W + GAP + CENTER_W + GAP + SIDE_W;
    const totalH = CENTER_H; // tallest element

    /* Side card vertical offset — center them vertically relative to center card */
    const sideTopOffset = (CENTER_H - SIDE_H) / 2;

    /* Side card shared transition */
    const sideTransitionDefault = {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    };

    return (
        <section
            ref={sectionRef}
            id="procedures"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundColor: '#E6D7C8',
                position: 'relative',
                width: '100%',
                height: '1146px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '60px',
            }}
        >
            {/* Dim overlay when video is playing */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        key="dim"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.15)',
                            zIndex: 20,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Title — ПРОЦЕДУРЫ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: titleVisible ? (isPlaying ? 0.3 : 1) : 0,
                    y: titleVisible ? 0 : 20,
                    filter: isPlaying ? 'blur(4px)' : 'blur(0px)',
                }}
                transition={{
                    opacity: { duration: 1, ease: 'easeOut' },
                    y: { duration: 1, ease: 'easeOut' },
                    filter: { duration: 0.5 },
                }}
                style={{
                    textAlign: 'center',
                    marginBottom: '64px',
                }}
            >
                <h2
                    style={{
                        fontFamily: FONT,
                        fontWeight: 300,
                        fontSize: '40px',
                        lineHeight: '1.5',
                        letterSpacing: '12px',
                        textTransform: 'uppercase',
                        color: ACCENT,
                        margin: '0 auto',
                        width: '389px',
                        height: '54px',
                    }}
                >
                    ПРОЦЕДУРЫ
                </h2>
            </motion.div>

            {/* Carousel container */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1728px',
                    margin: '0 auto',
                    height: `${totalH}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Navigation Arrows — elegant side buttons */}
                <motion.button
                    onClick={() => paginate(-1)}
                    animate={{ opacity: isPlaying ? 0 : 0.4 }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        left: '80px',
                        zIndex: 40,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: ACCENT,
                        pointerEvents: isPlaying ? 'none' : 'auto',
                        padding: '12px',
                    }}
                >
                    <ChevronLeft size={36} strokeWidth={1} />
                </motion.button>

                <motion.button
                    onClick={() => paginate(1)}
                    animate={{ opacity: isPlaying ? 0 : 0.4 }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        right: '80px',
                        zIndex: 40,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: ACCENT,
                        pointerEvents: isPlaying ? 'none' : 'auto',
                        padding: '12px',
                    }}
                >
                    <ChevronRight size={36} strokeWidth={1} />
                </motion.button>

                {/* Cards wrapper */}
                <div
                    style={{
                        position: 'relative',
                        width: `${totalW}px`,
                        height: `${totalH}px`,
                    }}
                >
                    <motion.div
                        key={`side-l-${leftIdx}`}
                        animate={{
                            opacity: 1,
                            filter: isPlaying ? 'blur(10px) grayscale(20%)' : 'none',
                            scale: 1,
                        }}
                        transition={sideTransitionDefault}
                        style={{
                            position: 'absolute',
                            top: `${sideTopOffset}px`,
                            left: '0px',
                            width: `${SIDE_W}px`,
                            height: `${SIDE_H}px`,
                            transformOrigin: 'center center',
                            zIndex: 10,
                            pointerEvents: 'none',
                            willChange: 'transform, opacity, filter',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                borderRadius: '0px',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                                position: 'relative',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <Image
                                src={ITEMS[leftIdx].image}
                                alt="Procedure L"
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={100}
                            />
                        </div>
                    </motion.div>

                    {/* ===== CENTER CARD (AnimatePresence for cinematic slide) ===== */}
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={`center-${activeIndex}`}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={cinematicTransition}
                            style={{
                                position: 'absolute',
                                top: '0px',
                                left: `${SIDE_W + GAP}px`,
                                width: `${CENTER_W}px`,
                                height: `${CENTER_H}px`,
                                zIndex: isPlaying ? 50 : 30,
                                cursor: 'pointer',
                                willChange: 'transform, opacity',
                            }}
                            onClick={togglePlay}
                        >
                            <motion.div
                                animate={{
                                    scale: 1,
                                    boxShadow: isPlaying
                                        ? '0 30px 80px rgba(0,0,0,0.2), 0 0 50px rgba(200,170,130,0.4)'
                                        : '0 20px 60px rgba(0,0,0,0.15)',
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                    borderRadius: '0px',
                                    position: 'relative',
                                    backgroundColor: 'transparent',
                                    transform: `translate(${parallax.x}px, ${parallax.y}px)`,
                                    transition: 'transform 0.2s ease-out',
                                    willChange: 'transform, box-shadow',
                                }}
                            >
                                {/* Robust Video Element */}
                                <video
                                    ref={videoRef}
                                    src={VIDEO_SRC}
                                    loop
                                    playsInline
                                    preload="auto"
                                    poster={ITEMS[activeIndex].image}
                                    muted={!isPlaying}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }}
                                    onClick={togglePlay}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                />

                                {/* UI Overlays */}
                                <AnimatePresence>
                                    {!isPlaying ? (
                                        /* Poster / Play Button Overlay */
                                        <motion.div
                                            key="poster-overlay"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={togglePlay}
                                        >
                                            <div style={{ width: '100px', height: '100px', zIndex: 20 }}>
                                                <Image
                                                    src="/images/Frame 52.png"
                                                    alt="Play"
                                                    width={100}
                                                    height={100}
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'contain',
                                                        filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    ) : (
                                        /* Custom Controls Overlay */
                                        <motion.div
                                            key="controls-overlay"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                padding: '24px 32px',
                                                zIndex: 10,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 100%)',
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            {/* Top Corner: Maximize icon */}
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', pointerEvents: 'auto' }}>
                                                <div style={{ width: '24px', height: '24px', position: 'relative', cursor: 'pointer' }}>
                                                    <Image
                                                        src="/images/maximize 1.png"
                                                        alt="Maximize"
                                                        fill
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Bottom Area: Pause + Volume + Seekbar */}
                                            <div style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                pointerEvents: 'auto'
                                            }}>
                                                {/* Pause/Play Button — Figma asset */}
                                                <div
                                                    onClick={togglePlay}
                                                    style={{
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: '28px',
                                                        height: '28px',
                                                        flexShrink: 0,
                                                        position: 'relative'
                                                    }}
                                                >
                                                    <Image
                                                        src={isPlaying ? "/images/circle-pause (1) 1.png" : "/images/Frame 52.png"}
                                                        alt={isPlaying ? "Pause" : "Play"}
                                                        fill
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                </div>
                                                {/* Volume Toggle */}
                                                <div
                                                    onClick={toggleMute}
                                                    style={{
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        opacity: 0.9,
                                                        width: '36px',
                                                        height: '36px',
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    {isMuted ? <VolumeX size={28} strokeWidth={1} /> : <Volume2 size={28} strokeWidth={1} />}
                                                </div>

                                                {/* Seekbar Container */}
                                                <div
                                                    id="seekbar-container"
                                                    onMouseDown={(e) => {
                                                        e.stopPropagation();
                                                        setIsDragging(true);
                                                        handleSeek(e);
                                                    }}
                                                    style={{
                                                        flex: 1,
                                                        height: '20px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    {/* Background (remaining) track */}
                                                    <div style={{
                                                        width: '100%',
                                                        height: '4px',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                                                        borderRadius: '2px',
                                                        position: 'absolute',
                                                        left: 0
                                                    }} />

                                                    {/* Filled (progress) track */}
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            left: 0,
                                                            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                                                            backgroundColor: 'rgba(125, 95, 85, 1)',
                                                            height: '4px',
                                                            borderRadius: '2px',
                                                            zIndex: 2,
                                                            transition: isDragging ? 'none' : 'width 0.1s linear'
                                                        }}
                                                    />

                                                    {/* Invisible larger hit area */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        backgroundColor: 'transparent'
                                                    }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* ===== RIGHT SIDE CARD ===== */}
                    <motion.div
                        key={`side-r-${rightIdx}`}
                        animate={{
                            opacity: 1,
                            filter: isPlaying ? 'blur(10px) grayscale(20%)' : 'none',
                            scale: 1,
                        }}
                        transition={sideTransitionDefault}
                        style={{
                            position: 'absolute',
                            top: `${sideTopOffset}px`,
                            left: `${SIDE_W + GAP + CENTER_W + GAP}px`,
                            width: `${SIDE_W}px`,
                            height: `${SIDE_H}px`,
                            transformOrigin: 'center center',
                            zIndex: 10,
                            pointerEvents: 'none',
                            willChange: 'transform, opacity, filter',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                borderRadius: '0px',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                                position: 'relative',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <Image
                                src={ITEMS[rightIdx].image}
                                alt="Procedure R"
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={100}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
