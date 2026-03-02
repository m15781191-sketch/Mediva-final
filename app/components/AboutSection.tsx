"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const clr = 'rgba(140, 85, 50, 1)';

interface TextBlockProps {
    heading: string;
    body: string;
    pos: React.CSSProperties;
    headingH?: number;
    delay?: number;
}

function TextBlock({ heading, body, pos, headingH, delay = 0 }: TextBlockProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className="absolute text-left" style={pos}>
            <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
                <motion.h3
                    initial={{ y: '100%' }}
                    animate={inView ? { y: '0%' } : { y: '100%' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay }}
                    style={{
                        fontFamily: "'Cormorant', serif",
                        fontWeight: 500,
                        fontSize: '26px',
                        lineHeight: '100%',
                        color: clr,
                        margin: 0,
                        height: headingH,
                    }}
                >
                    {heading}
                </motion.h3>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
                style={{
                    fontFamily: '"TT Runs Trial", sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: clr,
                    margin: 0,
                }}
            >
                {body}
            </motion.p>
        </div>
    );
}

export default function AboutSection() {
    return (
        <section
            id="about"
            style={{
                backgroundColor: '#E6D7C8',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                height: '1320px', /* Tall enough to show both head and hands/bottom part */
                minHeight: '900px',
            }}
        >
            {/* Woman image — Better framing for head + hands */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                }}
            >
                <Image
                    src="/images/youth-skin-care-concept-beauty-woman-face-portrait-beautiful-model-girl-with-perfect-fresh-clea 1.png"
                    alt="MEDIVA Clinic"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        filter: 'brightness(1.08) contrast(1.03)',
                    }}
                    priority
                />
            </div>

            {/* Content overlay */}
            <div className="relative w-full h-full z-10 max-w-[1728px] mx-auto px-8">
                <TextBlock
                    heading="Наша миссия"
                    body="обеспечить каждого пациента персонализированными и инновационными решениями, которые способствуют сохранению молодости и здоровья."
                    pos={{ right: '40px', top: '10%', width: '365px' }}
                    delay={0}
                />

                <TextBlock
                    heading="В MEDIVA clinic"
                    body="В MEDIVA clinic мы предлагаем широкий спектр услуг: от передовых лазерных технологий в косметологии и дерматологии, стоматологии и флебологии до релаксирующих SPA-процедур. Наш подход основан на использовании только лучших, сертифицированных материалов и современного оборудования, отвечающего международным стандартам качества."
                    pos={{ left: '40px', top: '40%', width: '365px' }}
                    headingH={31}
                    delay={0}
                />

                <TextBlock
                    heading="Наши специалисты"
                    body="это высококвалифицированные профессионалы, признанные эксперты в своих областях, которые неустанно совершенствуют свои навыки, следуя последним мировым тенденциям в медицине."
                    pos={{ right: '40px', top: '70%', width: '365px' }}
                    delay={0}
                />
            </div>
        </section>
    );
}
