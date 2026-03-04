"use client";

import Image from 'next/image';
import { Instagram, Facebook, Send, Youtube } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer id="footer" className={styles.footer}>
            {/* Logo Section */}
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <Image
                        src="/images/logo.png"
                        alt="MEDIVA CLINIC"
                        fill
                        className="brightness-0 invert object-contain"
                    />
                </div>
                <p className={styles.rights}>All rights reserved© 2026</p>
            </div>

            {/* Navigation Links */}
            <nav className={styles.nav}>
                {[
                    { label: "О нас", id: "about" },
                    { label: "Услуги", id: "services" },
                    { label: "Блог", id: "blog" },
                    { label: "Франшиза", id: "franchise" },
                    { label: "Контакты", id: "footer" }
                ].map((item) => (
                    <a key={item.id} href={`#${item.id}`} className={styles.navLink}>
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Addresses Section */}
            <div className={styles.branches}>
                <div className={styles.branch}>
                    <h4 className={styles.branchTitle}>ФИЛИАЛ ДАРХАН</h4>
                    <div className={styles.branchInfo}>
                        <p>100050,</p>
                        <p>Республика Узбекистан, город Ташкент,</p>
                        <p>улица Абдулла Кадыри 7</p>

                        <div className={styles.phoneGroup}>
                            <p>+998(97) 148-44-44</p>
                            <p>+998(55) 514-54-44</p>
                        </div>

                        <p className={styles.telegram}>Telegram: @MedivaDarhan</p>
                    </div>
                </div>

                <div className={styles.branch}>
                    <h4 className={styles.branchTitle}>ФИЛИАЛ АСКИЯ</h4>
                    <div className={styles.branchInfo}>
                        <p>100100,</p>
                        <p>Республика Узбекистан, город Ташкент,</p>
                        <p>улица Аския 26Б</p>

                        <div className={styles.phoneGroup}>
                            <p>+998(97) 554-44-55</p>
                            <p>+998(71) 253-84-44</p>
                        </div>

                        <p className={styles.telegram}>Telegram: @Mediva</p>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className={styles.divider}></div>

            {/* Social Media */}
            <div className={styles.socialContainer}>
                <p className={styles.socialText}>Подписывайтесь на нас в социальных сетях</p>
                <div className={styles.icons}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                        <Instagram size={24} strokeWidth={1} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                        <Facebook size={24} strokeWidth={1} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                        <Youtube size={24} strokeWidth={1} />
                    </a>
                    <a href="https://t.me/MedivaDarhan" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                        <Send size={24} strokeWidth={1} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
