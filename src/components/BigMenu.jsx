'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import Link from 'next/link';
import styles from '../styles/bigmenu.module.css';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import React from 'react';
// import Slider from 'react-slick';
// import styles from '../styles/bigmenu.module.css';

export function BigItem(props) {
  return (
    <motion.li
      // className="bg-(--color-foreground) px-4 hover:bg-white hover:text-(--color-foreground) shadow-[6px_0px_0_var(--color-background),12px_0px_0_var(--color-foreground)]"
      className={`bg-(--color-foreground) px-4 hover:text-white hover:shadow-[6px_0px_0_var(--color-background),12px_0px_0_var(--color-foreground)] hover:-translate-x-2 hover:w-screen hover:origin-left ${styles.menuItem}`}
      initial={{ translateX: 1000 }}
      whileInView={{ translateX: 0 }}
    >
      <Link href="/projects">{props.title}</Link>
    </motion.li>
  );
}

export default function BigMenu(props) {
  const { scrollYProgress } = useScroll({
    // target: ref,
    // offset: ['end end', 'start start'],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#f00', '#0f0', '#00f'],
  );

  return (
    // <nav>
    //   <ul className="text-(--color-background) uppercase text-8xl font-extralight w-lg justify-self-center flex flex-col gap-2">
    //     <li className="bg-(--color-foreground) px-4">
    //       <Link href="/projects">Projects</Link>
    //     </li>
    //     <li className="bg-(--color-foreground) px-4">
    //       <Link href="/contact">Contact</Link>
    //     </li>
    //     <li className="bg-(--color-foreground) px-4">
    //       <Link href="/about">About</Link>
    //     </li>
    //   </ul>
    // </nav>
    <nav>
      <ul className="text-(--color-background) uppercase text-8xl font-semibold w-lg justify-self-center flex flex-col gap-2 py-2">
        {/* <motion.li
          className="bg-(--color-foreground) px-4 hover:bg-white hover:text-(--color-foreground) shadow-2xl"
          initial={{ translateX: 1000 }}
          whileInView={{ translateX: 0 }}
        >
          <Link href="/projects">Projects</Link>
        </motion.li>
        <motion.li
          className="bg-(--color-foreground) px-4 hover:bg-white hover:text-(--color-foreground)"
          initial={{ translateX: -1000 }}
          whileInView={{ translateX: 0 }}
        >
          <Link href="/contact">Contact</Link>
        </motion.li>
        <motion.li
          className="bg-(--color-foreground) px-4 hover:bg-white hover:text-(--color-foreground) shadow-[6px_0px_0_var(--color-background),12px_0px_0_var(--color-foreground)]"
          initial={{ translateX: 1000 }}
          whileInView={{ translateX: 0 }}
          // style={{ backgroundColor }}
        >
          <Link href="/about">About</Link>
        </motion.li> */}
        <BigItem title={`Projects`} />
        <BigItem title={`About`} />
        <BigItem title={`Contact`} />
      </ul>
    </nav>
  );
}
