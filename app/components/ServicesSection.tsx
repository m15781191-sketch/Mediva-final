"use client";

import Image from "next/image";
import { useState } from "react";

const THEME_COLOR = 'rgba(125, 95, 85, 1)';
const SUB_COLOR = 'rgba(140, 85, 50, 1)';
const TITLE_COLOR = '#000000';
const BG_COLOR = '#FFFFFF';
const FONT = '"TT Runs Trial", sans-serif';

type Service = {
    number: string;
    title: string;
    topSubServices: string[];
    bottomSubServices: string[];
    icon: string;
    activeHeight: number;
    hasBorderTop?: boolean;
};

const services: Service[] = [
    {
        number: "01",
        title: "КОСМЕТОЛОГИЯ",
        topSubServices: ["Контурная пластика лица", "Биоревитализация и мезотерапия", "Ботулинотерапия"],
        bottomSubServices: ["Плазмолифтинг", "Трихология", "Уходовые программы"],
        icon: "/images/Frame 22.png",
        activeHeight: 290,
    },
    {
        number: "02",
        title: "ДЕРМАТОЛОГИЯ",
        topSubServices: ["Лечение постакне", "Лечение розацеа", "Лечение акне"],
        bottomSubServices: ["Удаление папиллом и родинок", "Лазерная шлифовка", "Дерматоскопия"],
        icon: "/images/Frame 135 (2).png",
        activeHeight: 290,
    },
    {
        number: "03",
        title: "СТОМАТОЛОГИЯ",
        topSubServices: ["Лечение постакне", "Лечение розацеа", "Лечение акне"],
        bottomSubServices: ["Удаление папиллом и родинок", "Лазерная шлифовка", "Дерматоскопия"],
        icon: "/images/Frame 142.png",
        activeHeight: 290,
    },
    {
        number: "04",
        title: "ГИНЕКОЛОГИЯ",
        topSubServices: ["Консультация", "Анализы"],
        bottomSubServices: ["Интимное омоложение", "Аугментация точки G"],
        icon: "/images/Frame 144.png",
        activeHeight: 226,
    },
    {
        number: "05",
        title: "ФЛЕБОЛОГИЯ",
        topSubServices: ["Консультация", "Анализы"],
        bottomSubServices: ["Интимное омоложение", "Аугментация точки G"],
        icon: "/images/Frame 145.png",
        activeHeight: 226,
    },
    {
        number: "06",
        title: "АППАРАТНЫЕ ПРОЦЕДУРЫ",
        topSubServices: ["RF-Лифтинг Geniuse", "Vbeam Perfecta", "Лазерная шлифовка CO2RE", "Hydrafacial MD"],
        bottomSubServices: ["Ultraformer MPT", "Лазерная эпиляция Genlemax Pro", "Эндосфера-терапия", "Удаление солнечного лентиго"],
        icon: "/images/Frame 137 (2).png",
        activeHeight: 354,
    },
];

function ServiceRow({ service, isActive, onHover }: { service: Service; isActive: boolean; onHover: () => void }) {
    return (
        <div
            onMouseEnter={onHover}
            style={{
                position: 'relative',
                width: '100%',
                backgroundColor: BG_COLOR,
                height: isActive ? `${service.activeHeight}px` : '160px',
                transition: 'height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                cursor: 'pointer',
                borderTop: '1px solid rgba(125, 95, 85, 0.1)',
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: '1488px',
                height: '100%',
                margin: '0 auto',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* ── NUMBER ── */}
                <div
                    style={{
                        position: 'absolute',
                        left: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: FONT,
                        fontSize: '100px',
                        fontWeight: 300,
                        color: THEME_COLOR,
                        lineHeight: 1,
                        letterSpacing: '0.02em',
                        userSelect: 'none',
                        opacity: isActive ? 1 : 0.2,
                        transition: 'opacity 0.4s ease',
                    }}
                >
                    {service.number}
                </div>

                {/* ── CENTER CONTENT (Flex Column for 1:1 spacing) ── */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isActive ? '30px' : '0',
                    transition: 'gap 0.5s ease',
                    zIndex: 10
                }}>
                    {/* TOP SUB-SERVICES */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        {service.topSubServices.map((item, i) => (
                            <span key={i} style={{
                                color: 'rgba(140, 85, 50, 1)',
                                fontSize: '16px',
                                fontFamily: FONT,
                                fontWeight: 400,
                                letterSpacing: '0.04em',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.2,
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* TITLE */}
                    <h3
                        style={{
                            margin: 0,
                            color: TITLE_COLOR,
                            fontFamily: FONT,
                            fontSize: '28px',
                            fontWeight: 400,
                            letterSpacing: '0.38em',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            lineHeight: 1,
                        }}
                    >
                        {service.title}
                    </h3>

                    {/* BOTTOM SUB-SERVICES */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(-10px)',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        {service.bottomSubServices.map((item, i) => (
                            <span key={i} style={{
                                color: 'rgba(140, 85, 50, 1)',
                                fontSize: '16px',
                                fontFamily: FONT,
                                fontWeight: 400,
                                letterSpacing: '0.04em',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.2,
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── ICON ── */}
                <div
                    style={{
                        position: 'absolute',
                        right: '87px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '140px',
                        height: '130px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isActive ? 1 : 0.3,
                        transition: 'opacity 0.4s ease',
                    }}
                >
                    <Image
                        src={service.icon}
                        alt={service.title}
                        width={140}
                        height={130}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'sepia(40%) saturate(150%) hue-rotate(340deg) brightness(90%)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMale, setIsMale] = useState(false);

    return (
        <section
            id="services"
            style={{
                backgroundColor: '#FFFFFF',
                paddingTop: '100px',
                paddingBottom: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Section Heading */}
                <h2
                    style={{
                        color: THEME_COLOR,
                        fontFamily: FONT,
                        fontSize: '42px',
                        fontWeight: 300,
                        lineHeight: 1.2,
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        margin: '0 0 50px 0',
                    }}
                >
                    Наши услуги
                </h2>

                {/* Tabs */}
                <div style={{ display: 'flex', marginBottom: '50px' }}>
                    <button
                        onClick={() => setIsMale(false)}
                        style={{
                            fontFamily: FONT,
                            fontWeight: 400,
                            fontSize: '14px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            padding: '16px 50px',
                            border: `1px solid ${THEME_COLOR}`,
                            borderRight: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: !isMale ? 'rgba(140,85,50,1)' : 'transparent',
                            color: !isMale ? '#FFFFFF' : THEME_COLOR,
                        }}
                    >
                        Для женщин
                    </button>
                    <button
                        onClick={() => setIsMale(true)}
                        style={{
                            fontFamily: FONT,
                            fontWeight: 400,
                            fontSize: '14px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            padding: '16px 50px',
                            border: `1px solid ${THEME_COLOR}`,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: isMale ? 'rgba(140,85,50,1)' : 'transparent',
                            color: isMale ? '#FFFFFF' : THEME_COLOR,
                        }}
                    >
                        Для мужчин
                    </button>
                </div>

                {/* Service Rows */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(125, 95, 85, 0.1)' }}>
                    {services.map((service, index) => (
                        <ServiceRow
                            key={service.number}
                            service={service}
                            isActive={activeIndex === index}
                            onHover={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
