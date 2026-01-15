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
        className={`pt-2 sm:pt-0 sm:text-[calc(24px+(200-24)*((100vw-300px)/(1600-300)))] text-[60px] uppercase ${styles.logo} drop-shadow-[0px_0px_0.4rem_#ca2bc4]`}
      >
        Jeff{' '}
        <motion.span
          // key={index}
          // className={styles.bigBump}
          initial={{ y: 0 }}
          className="relative inline-block"
          animate={{ y: '-0.14em' }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          T
        </motion.span>{' '}
        Byrd
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${styles.subtitle} text-center tracking-wide uppercase z-10 mb-2 md:mb-0 text-xl sm:text-[calc(16px+(38-16)*((100vw-300px)/(1600-300)))] w-4/5 md:w-auto mx-auto drop-shadow-[0px_0px_0.3rem_#ca2bc4] md:leading-8 lg:leading-9 xl:leading-11 2xl:leading-13`}
      >
        <span className={`font-medium`}>Composer</span>{' '}
        <span className={` text-lg align-middle`}>
          <a href="/projects/white-lies/" className={`hover:text-white`}>
            &rarr;{' '}
            <span className={`underline underline-offset-3 decoration-1`}>
              NPR's 'White Lies'
            </span>
          </a>
        </span>
        <br />
        <span className={`font-medium`}>Web Developer</span>
      </motion.h2>
    </>
  );
}
