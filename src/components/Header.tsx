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

const Header = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // target: ref,
    offset: ['end end', 'start start'],
  });
  const [logoScale, setLogoScale] = useState(1);
  const [logoScale2, setLogoScale2] = useState(1);

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

  console.log('logoScale', logoScale);

  const MenuItem = ({ children }: Props) => {
    return (
      <li
        className={`tracking-wide transition-all text-xl xl:text-3xl ${styles.menuItem} px-3 hover:scale-[1.2] active:scale-[0.97] transition-all delay-0 duration-300 ease-in-out`}
      >
        {children}
      </li>
    );
  };

  return (
    <header className="sticky z-100 top-0 bg-(--color-background) border-b-1 border-solid border-(--color-background)">
      <nav>
        <div className="grid lg:grid-cols-2 lg:gap-30 lg:ml-0 lg:mr-24 py-0 border-b-1 border-solid border-(--color-foreground) ">
          <motion.div
            style={{
              scale: logoScale2,
              paddingTop: logoScale * 15,
              paddingBottom: logoScale * 15,
            }}
            className="grid lg:items-end px-4 py-2 lg:py-0"
          >
            <Link href="/">
              <h1
                className={`${styles.logo} font-(--font-karrik) uppercase text-5xl lg:text-3xl text-black opacity-70 transition-all delay-100 duration-300 ease-in-out hover:tracking-widest active:tracking-tight hover:opacity-100 text-center lg:text-left mt-2 lg:mt-0`}
              >
                Jeff <span className={styles.bump}>T</span> Byrd
              </h1>
            </Link>
          </motion.div>
          <motion.div
            style={{
              paddingTop: logoScale * 25,
              paddingBottom: logoScale * 25,
            }}
            className="lg:px-4 lg:py-5 bg-(--color-foreground) py-[logoScale*25]"
          >
            <nav className="layout flex items-center justify-center py-0">
              <ul className="flex items-center justify-between space-x-3 2xl:space-x-4 md:text-base font-light uppercase text-white ">
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

export default Header;
