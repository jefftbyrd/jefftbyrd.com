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
  url: string;
  image: string;
};

export default function HomeFeaturedProject(props: Props) {
  return (
    <motion.a
      className="origin-bottom-right  "
      href={props.url}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, delay: 0 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        className="shadow-lg shadow-black/10"
        src={props.image}
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{
          duration: 0.5,
          delay: props.delayTime,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      />
    </motion.a>
  );
}
