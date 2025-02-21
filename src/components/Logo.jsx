'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import { useRef, useState } from 'react';
import styles from '../styles/home.module.css';

export default function Logo(props) {
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
        className={styles.logo}
      >
        Jeff <span className={styles.bump}>T</span> Byrd
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.subtitle}
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
