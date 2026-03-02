"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FONT = '"TT Runs Trial Variable Roman", "TT Runs Trial", sans-serif';

export default function FounderSection() {
  return (
    <section
      id="founder"
      style={{
        width: '100%',
        minHeight: '982px',
        backgroundColor: '#E6D7C8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: '60px',
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1728px',
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* FOUNDER IMAGE CIRCLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            position: 'absolute',
            top: '55px',
            width: 'min(640px, 90vw)',
            height: 'min(640px, 90vw)',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            zIndex: 5,
          }}
        >
          <Image
            src="/images/founder.png"
            alt="Founder"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </motion.div>

        {/* QUOTE ICON */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            position: 'absolute',
            top: '100px',
            left: 'calc(50% + 203px)',
            width: '96px',
            height: '96px',
            zIndex: 20,
            filter: 'drop-shadow(1px 0 0 rgba(140, 85, 50, 1)) drop-shadow(-1px 0 0 rgba(140, 85, 50, 1)) drop-shadow(0 1px 0 rgba(140, 85, 50, 1)) drop-shadow(0 -1px 0 rgba(140, 85, 50, 1))'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#E6D7C8',
              WebkitMaskImage: 'url(/images/quote-icon.png)',
              maskImage: 'url(/images/quote-icon.png)',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />
        </motion.div>

        {/* TEXT CONTENT CONTAINER */}
        <div style={{
          marginTop: '720px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          paddingBottom: '80px',
          zIndex: 10
        }}>
          {/* NAME */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ width: '100%', maxWidth: '600px' }}
          >
            <h2 style={{
              fontFamily: FONT,
              fontWeight: 300,
              fontSize: 'max(24px, 40px)',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 1)',
              textTransform: 'uppercase',
              margin: 0
            }}>
              ЛУИЗА<br />ШАРАХМЕТОВА
            </h2>
          </motion.div>

          {/* SUBTITLE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '100%',
              letterSpacing: '0.28em',
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 1)',
              textTransform: 'uppercase',
              margin: 0
            }}>
              ОСНОВАТЕЛЬ MEDIVA CLINIC
            </p>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              width: '100%',
              maxWidth: '739px',
              padding: '0 20px',
            }}
          >
            <p style={{
              fontFamily: FONT,
              fontWeight: 300,
              fontSize: '17px',
              lineHeight: '1.6',
              letterSpacing: '0.01em',
              textAlign: 'center',
              color: 'rgba(140, 85, 50, 1)',
              margin: 0
            }}>
              Луиза Шарахметова — профессиональный специалист, убеждённый в гармонии красоты и здоровья. Объединяя многолетний опыт и знания в области эстетической медицины, соответствующие мировым стандартам, она создала в Ташкенте высокотехнологичное и безопасное пространство красоты. Основная цель Луизы Шарахметовой — сохранить естественную красоту каждого клиента и вернуть уверенность в себе через индивидуальный подход.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
