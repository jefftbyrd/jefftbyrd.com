'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import styles from '../styles/pageTitle.module.css';

type Props = {
  pageTitle: string;
};

export default function PageTitle(props: Props) {
  const wrapT = (text: string) => {
    return text.split('').map((char, index) => {
      if (char.toLowerCase() === 't') {
        return (
          <motion.span
            key={index}
            className={styles.bigBump}
            initial={{ y: 0 }}
            animate={{ y: '-0.14em' }}
            transition={{
              duration: 0.5,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {char}
          </motion.span>
        );
      }
      return char;
    });
  };

  return (
    <h1 className="mx-4 lg:mx-0 pt-12 -mb-7 lg:-mb-13 font-primary text-white uppercase leading-none font-bold lg:px-24 text-6xl tracking-wide lg:text-[calc(24px+(212-24)*((100vw-300px)/(1600-300)))] overflow-hidden">
      {wrapT(props.pageTitle)}
    </h1>
  );
}
