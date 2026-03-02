"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./CTAFormSection.module.css";

export default function CTAFormSection() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let filteredValue = value;
        if (name === "name") {
            // Allow only letters and spaces (Cyrillic and Latin)
            filteredValue = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
        } else if (name === "phone") {
            // Allow only digits
            filteredValue = value.replace(/[^0-9]/g, "");
        }

        setFormData((p) => ({ ...p, [name]: filteredValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    ЗАПИШИТЕСЬ НА ПРИЕМ
                    <br />
                    ПРЯМО СЕЙЧАС И ПОЛУЧИТЕ
                    <br />
                    5% СКИДКУ
                </h2>

                <div className={styles.imageWrapper}>
                    <Image
                        src="/images/19 1.png"
                        alt="Hands"
                        fill
                        sizes="244px"
                        className={styles.image}
                        priority
                    />
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="name"
                            placeholder="ИМЯ*"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="НОМЕР ТЕЛЕФОНА*"
                            className={styles.input}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="message"
                            placeholder="СООБЩЕНИЕ"
                            className={styles.input}
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        ОТПРАВИТЬ
                    </button>
                </form>
            </div>
        </section>
    );
}