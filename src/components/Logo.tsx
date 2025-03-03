'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import { useRef, useState } from 'react';
import styles from '../styles/home.module.css';

export default function Logo() {
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   // target: ref,
  //   offset: ['end end', 'start start'],
  // });

  return (
    <>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`py-2 sm:py-0 lg:text-[calc(24px+(200-24)*((100vw-300px)/(1600-300)))] text-[60px] uppercase ${styles.logo} z-100`}
      >
        Jeff <span className={styles.bump}>T</span> Byrd
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${styles.subtitle} text-center uppercase z-100 mb-2 md:mb-0 text-2xl md:text-[calc(16px+(38-16)*((100vw-300px)/(1600-300)))]`}
      >
        Web developer, composer & sound designer
      </motion.h2>
    </>

    // <motion.h1
    //   // initial={{ scale: 1 }}
    //   // whileInView={{ opacity: 1 }}
    //   // viewport={{ root: scrollRef }}
    //   // ref={ref}
    //   className={styles.logo}
    //   // style={{ scale: scrollYProgress }}
    // >
    //   Jeff <span className={styles.bump}>T</span> Byrd
    // </motion.h1>
  );
}
