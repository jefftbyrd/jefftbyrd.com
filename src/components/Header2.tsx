'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import styles from '../styles/header.module.css';

type Props = {
  children: React.ReactNode;
};

type Props2 = {
  heroRef: React.RefObject<HTMLElement>;
};

const Header2 = ({ heroRef }: Props2) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // target: ref,
    offset: ['end end', 'start start'],
  });
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const [logoScale, setLogoScale] = useState(1);
  const [logoScale2, setLogoScale2] = useState(1);
  const [jtbOpacity, setJtbOpacity] = useState(0);

  const mapNumRange = (
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ): number => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    let newScale = current;
    if (current < 0.8) {
      newScale = 0.8;
    }
    setLogoScale(mapNumRange(newScale, 0.8, 1, 0, 1));
    setLogoScale2(mapNumRange(newScale, 0.8, 1, 0.7, 1));
  });

  useMotionValueEvent(heroScrollProgress, 'change', (current: number) => {
    if (current <= 0.8) {
      setJtbOpacity(0);
    } else {
      setJtbOpacity(mapNumRange(current, 0.8, 1, 0, 1));
    }
  });

  const MenuItem = ({ children }: Props) => {
    return (
      <li
        className={`tracking-wide transition-all text-lg xl:text-2xl ${styles.menuItem} px-3 hover:scale-[1.2] active:scale-[0.97] transition-all delay-0 duration-300 ease-in-out`}
      >
        {children}
      </li>
    );
  };

  console.log('jtbOpacity', jtbOpacity);

  return (
    <header className="sticky top-0 bg-background border-b border-solid border-background z-120">
      <nav>
        <div
          className="grid lg:grid-cols-2 lg:gap-30 lg:ml-0 lg:mr-12 py-0 border-b border-solid border-foreground"
          style={{ borderColor: `rgba(0, 94, 219, ${jtbOpacity})` }}
        >
          <motion.div
            style={{
              scale: logoScale2,
              paddingTop: jtbOpacity * 5,
              paddingBottom: jtbOpacity * 5,
              opacity: jtbOpacity,
              height: jtbOpacity * 60, // adjust 80 to match your actual logo height
            }}
            className="grid lg:items-end px-4 py-2 lg:py-0"
          >
            <Link href="/">
              <motion.h1
                className={`${styles.logo} font-(--font-karrik) uppercase text-5xl lg:text-3xl text-black opacity-70 transition-all delay-100 duration-300 ease-in-out hover:tracking-widest active:tracking-tight hover:opacity-100 text-center lg:text-left mt-2 lg:mt-0`}
              >
                Jeff <span className={styles.bump}>T</span> Byrd
              </motion.h1>
            </Link>
          </motion.div>
          <motion.div
            style={{
              paddingTop: logoScale * 10,
              paddingBottom: logoScale * 10,
            }}
            className="lg:px-4 lg:py-5 bg-foreground py-[logoScale*25]"
          >
            <nav className="layout flex items-center justify-center py-0">
              <ul className="flex items-center justify-between space-x-2 lg:space-x-0 xl:space-x-2 2xl:space-x-4 md:text-base font-light xl:font-extralight uppercase text-white ">
                <MenuItem>
                  <Link href="/projects">
                    Projec<span className={styles.t}>t</span>s
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/about">
                    Abou<span className={styles.t}>t</span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/contact">
                    Con<span className={styles.t}>t</span>ac
                    <span className={styles.t}>t</span>
                  </Link>
                </MenuItem>
              </ul>
            </nav>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

export default Header2;
