'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import styles from '../styles/home.module.css';

export default function Logo() {
  return (
    <>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`pt-2 sm:pt-0 sm:text-[calc(24px+(200-24)*((100vw-300px)/(1600-300)))] text-[60px] uppercase ${styles.logo} z-100`}
      >
        Jeff <span className={styles.bump}>T</span> Byrd
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${styles.subtitle} text-center uppercase z-10 mb-2 md:mb-0 text-xl sm:text-[calc(16px+(38-16)*((100vw-300px)/(1600-300)))] w-4/5 md:w-auto mx-auto`}
      >
        Web developer, composer & sound designer
      </motion.h2>
    </>
  );
}
