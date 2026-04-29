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
    <div>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`pt-2 sm:pt-0 sm:text-[calc(24px+(200-24)*((100vw-300px)/(1600-300)))] text-[60px] uppercase ${styles.logo}  `}
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
        className={` text-center uppercase font-light z-10 mb-2 md:mb-0 text-xl sm:text-[calc(22px+(38-16)*((100vw-300px)/(1600-300)))] w-4/5 md:w-auto mx-auto  -mt-2`}
      >
        Composer & Sound Designer
      </motion.h2>
    </div>
  );
}
