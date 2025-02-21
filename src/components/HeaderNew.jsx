'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import { useRef, useState } from 'react';
import styles from '../styles/home.module.css';

export default function HeaderNew(props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // target: ref,
    offset: ['end end', 'start start'],
  });
  const [logoScale, setLogoScale] = useState(1);

  const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
    ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    let newScale = current;
    if (current < 0.7) {
      newScale = 0.7;
    }
    setLogoScale(mapNumRange(newScale, 0.7, 1, 0.3, 1));
    console.log('current ', current);
    console.log('newScale ', newScale);
  });

  console.log('logoscale', logoScale);

  return (
    <div ref={ref} className={styles.jtbHeader}>
      <section className="mt-16 mb-16 md:mb-12">
        <motion.h1
          // initial={{ scale: 1 }}
          // whileInView={{ opacity: 1 }}
          // viewport={{ root: scrollRef }}
          // ref={ref}
          className={styles.logo}
          style={{ scale: logoScale }}
        >
          Jeff <span className={styles.bump}>T</span> Byrd
        </motion.h1>
        <h2 className={styles.subtitle}>
          Web developer, composer & sound designer
        </h2>
      </section>
    </div>
  );
}
