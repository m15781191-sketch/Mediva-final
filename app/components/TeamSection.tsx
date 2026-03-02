"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./TeamSection.module.css";

type Doctor = {
    id: number;
    nameLines: string[];
    title: string;
    description: string;
    image: string;
};

const DOCTORS: Doctor[] = [
    {
        id: 1,
        nameLines: ["РАХМАТОВА", "ДИНА ВАЛЕРЬЕВНА"],
        title: "КОСМЕТОЛОГ",
        description: "Окончила Ташкентскую Медицинскую\nАкадемию в 2014 году.",
        image: "/images/doctor1.png",
    },
    {
        id: 2,
        nameLines: ["КВОН ИННА", "ТРОФИМОВНА"],
        title: "КОСМЕТОЛОГ",
        description: "Окончила Ташкентский\nПедиатрический Медицинский\nИнститут",
        image: "/images/doctor2.png",
    },
    {
        id: 3,
        nameLines: ["ШАЯКУБОВА", "ДЖАМИЛЯ ЯЛКИНОВНА"],
        title: "ДЕРМАТОЛОГ",
        description: "Окончила Ташкентский\nПедиатрический Медицинский\nИнститут",
        image: "/images/doctor3.png",
    },
    {
        id: 4,
        nameLines: ["АБДУЛЛАЕВА", "ЛОЛА РУСТАМОВНА"],
        title: "ЭНДОКРИНОЛОГ",
        description: "Специалист по гормональному\nздоровью и антивозрастной\nтерапии.",
        image: "/images/doctor4.png",
    },
];

// 1:1 Figma Positions. Adjusted: +38px (1cm) down.
const CIRCLE_POSITIONS = [208, 398, 588, 778];
const CIRCLE_SIZE = 280;
const COLUMN_CENTER_X = 864; // 1728 / 2
const CIRCLE_LEFT = COLUMN_CENTER_X - (CIRCLE_SIZE / 2); // 724px

export default function TeamSection() {
    const [activeId, setActiveId] = useState<number>(1);
    const activeDoctor = DOCTORS.find((d) => d.id === activeId) || DOCTORS[0];
    const activeIndex = DOCTORS.findIndex((d) => d.id === activeId);

    const activeCircleTop = CIRCLE_POSITIONS[activeIndex];
    const centerY = activeCircleTop + CIRCLE_SIZE / 2;

    const nameTop = centerY - 32; // Centered to 64px name height
    const lineTop = centerY;
    const infoTop = centerY - 50;

    return (
        <section className={styles.section}>
            {/* DESKTOP LAYOUT */}
            <div className="hidden md:block">
                <div className={styles.containerDesktop}>
                    {/* TITLE */}
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className={styles.title}
                    >
                        ВРАЧИ<br />НАШЕЙ КЛИНИКИ
                    </motion.h2>

                    {/* LEFT - DOCTOR NAME */}
                    <motion.div
                        key={`name-${activeId}`}
                        initial={{ opacity: 0, x: -20, top: nameTop }}
                        animate={{ opacity: 1, x: 0, top: nameTop }}
                        transition={{ duration: 0.4 }}
                        className={`${styles.nameBlock} hidden lg:block`}
                    >
                        <div>{activeDoctor.nameLines[0]}</div>
                        <div>{activeDoctor.nameLines[1]}</div>
                    </motion.div>

                    {/* DECORATIVE LINE */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1, top: lineTop }}
                        transition={{ duration: 0.6 }}
                        className={`${styles.lineBlock} hidden lg:block`}
                    />

                    {/* RIGHT - INFO PANEL */}
                    <motion.div
                        key={`info-${activeId}`}
                        initial={{ opacity: 0, x: 20, top: infoTop }}
                        animate={{ opacity: 1, x: 0, top: infoTop }}
                        transition={{ duration: 0.4 }}
                        className={styles.infoPanel}
                    >
                        <div className={styles.infoTitle}>{activeDoctor.title}</div>
                        <div className={styles.descriptionBox}>
                            {activeDoctor.description}
                        </div>
                        <button className={styles.ctaButton}>
                            ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
                        </button>
                    </motion.div>

                    {/* DOCTOR CIRCLES */}
                    <div className={styles.circlesContainer}>
                        {DOCTORS.map((doctor, index) => {
                            const isActive = activeId === doctor.id;
                            const circleTop = CIRCLE_POSITIONS[index];

                            return (
                                <motion.div
                                    key={doctor.id}
                                    className={styles.doctorCircle}
                                    style={{
                                        width: `${CIRCLE_SIZE}px`,
                                        height: `${CIRCLE_SIZE}px`,
                                        top: `${circleTop}px`,
                                        left: `${CIRCLE_LEFT}px`,
                                        boxShadow: isActive
                                            ? "0 20px 40px rgba(0,0,0,0.1)"
                                            : "0 8px 20px rgba(0,0,0,0.05)",
                                    }}
                                    initial={{ scale: 1, opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: isActive ? "grayscale(0%)" : "grayscale(100%) brightness(0.9)",
                                        zIndex: 10 + index, // Lower ones always on top to protect heads
                                    }}
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => setActiveId(doctor.id)}
                                >
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.nameLines.join(" ")}
                                        fill
                                        className={styles.doctorImage}
                                        priority={index === 0}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* VIEW ALL DOCTORS BUTTON — faqat Team section ichida */}
                    <div className={styles.viewAllButtonWrapper}>
                        <button className={styles.viewAllButton}>
                            <span>ПОСМОТРЕТЬ ВСЕХ ВРАЧЕЙ</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className={`block md:hidden ${styles.mobileSection}`}>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.mobileTitle}
                >
                    ВРАЧИ
                    <br />
                    НАШЕЙ КЛИНИКИ
                </motion.h2>

                <div className={styles.mobileList}>
                    {DOCTORS.map((doctor, index) => {
                        const isActive = activeId === doctor.id;

                        return (
                            <motion.div
                                key={doctor.id}
                                className={styles.mobileCircleWrapper}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <motion.div
                                    className={styles.mobileCircle}
                                    style={{
                                        width: isActive ? "220px" : "180px",
                                        height: isActive ? "220px" : "180px",
                                        boxShadow: isActive
                                            ? "0 15px 40px rgba(0,0,0,0.15)"
                                            : "0 8px 20px rgba(0,0,0,0.08)",
                                    }}
                                    animate={{
                                        scale: isActive ? 1 : 0.95,
                                        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                                    }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => setActiveId(doctor.id)}
                                >
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.nameLines.join(" ")}
                                        width={220}
                                        height={220}
                                        className="object-cover object-top w-full h-full"
                                    />
                                </motion.div>

                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className={styles.mobileInfo}
                                    >
                                        <h3 className={styles.mobileName}>
                                            {doctor.nameLines.map((line, i) => (
                                                <div key={i}>{line}</div>
                                            ))}
                                        </h3>
                                        <div className={styles.mobileRole}>{doctor.title}</div>
                                        <div className={styles.mobileDesc}>{doctor.description}</div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <button className={styles.mobileButtonFilled}>
                    <span>ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ</span>
                </button>
                <button className={styles.mobileButtonOutline}>
                    <span>ПОСМОТРЕТЬ ВСЕХ ВРАЧЕЙ</span>
                </button>
            </div>
        </section>
    );
}
