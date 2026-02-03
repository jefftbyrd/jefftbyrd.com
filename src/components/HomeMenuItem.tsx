'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import styles from '../styles/home.module.css';

type Props = {
  delayTime: number;
  title: string;
};

export default function HomeMenuItem(props: Props) {
  return (
    <motion.div
      className={`${styles.menuItem} pt-2 lg:pt-6 bg-(--color-foreground) pb-[20vh] md:pb-8 lg:text-[4em] text-5xl md:text-6xl uppercase bottom-0 shadow-lg shadow-black/20 `}
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: props.delayTime,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.a
        href={`/${props.title.toLowerCase()}`}
        className=" w-full text-center grid items-center tracking-[-12px] md:tracking-[-28px] "
        whileHover={{
          paddingBottom: 60,
          color: '#fff',
          transition: { duration: 0.2, delay: 0 },
          // className: 'tracking-[-7px] md:tracking-[-16px]',
          letterSpacing: '-14px',
        }}
        whileTap={{ scale: 0.95 }}
      >
        {props.title}
      </motion.a>
    </motion.div>
  );
}
