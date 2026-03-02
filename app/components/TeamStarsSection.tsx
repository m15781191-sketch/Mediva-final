import React from 'react';
import Image from 'next/image';
import styles from './TeamStarsSection.module.css';

const stars = [
    {
        name: "НИЛЮФАР УСМАНОВА",
        image: "/images/Nilufar.png",
        text: "Когда я первый раз попала в эту клинику, я была поражена ее масштабом: столько кабинетов, процедур и современных аппаратов. Атмосфера в клинике просто волшебная. Уютный интерьер и внимательное обслуживание создают особенное ощущение комфорта. Я ценю каждый момент, проведенный здесь, и рада, что выбрала именно эту клинику",
    },
    {
        name: "МУНИСА РИЗАЕВА",
        image: "/images/Munisa.png",
        text: "Я выбрала клинику MEDIVA, потому что здесь работает мой косметолог Мухлиса, и я доверяю ей уход за собой. Я регулярно посещаю клинику, поскольку мне нравятся аппаратные процедуры, которые помогают поддерживать мою кожу в отличной форме. В клинике MEDIVA я всегда получаю качественное обслуживание.",
    },
    {
        name: "МИЛЕНА МАДМУСАЕВА",
        image: "/images/Milena.png",
        text: "Я выражаю искреннюю благодарность всему коллективу клиники MEDIVA. Из числа врачей, которых мне посчастливилось посетить, я хотела бы выделить косметолога Мухлису Абдувахидову и гинеколога Наргизу Рахманову. Они не только замечательные специалисты, но и заботливые, чуткие люди.",
    }
];

const TeamStarsSection = () => {
    return (
        <section id="stars" className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    НАС ВЫБИРАЮТ ЗВЕЗДЫ
                </h2>

                <div className={styles.grid}>
                    {stars.map((star, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={star.image}
                                    alt={star.name}
                                    fill
                                    className={styles.image}
                                />
                            </div>

                            <h3 className={styles.name}>
                                {star.name}
                            </h3>

                            <p className={styles.description}>
                                {star.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamStarsSection;
