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
        className={`pt-2 sm:pt-0 sm:text-[calc(24px+(200-24)*((100vw-300px)/(1600-300)))] text-[60px] uppercase ${styles.logo} drop-shadow-[0px_0px_0.4rem_#ca2bc4] `}
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
        className={` text-center uppercase font-light z-10 mb-2 md:mb-0 text-xl sm:text-[calc(22px+(38-16)*((100vw-300px)/(1600-300)))] w-4/5 md:w-auto mx-auto drop-shadow-[0px_0px_0.3rem_#ca2bc4] -mt-2`}
      >
        Composer & Web Developer
      </motion.h2>
      {/* <motion.div
        className="text-center workAreas"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="left">Narrative Audio</div>
        <div className="right">Interactive Media</div>
      </motion.div> */}
    </>
  );
}
