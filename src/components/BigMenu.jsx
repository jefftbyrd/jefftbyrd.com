import Link from 'next/link';

// 'use client';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import React from 'react';
// import Slider from 'react-slick';
// import styles from '../styles/bigmenu.module.css';

export default function BigMenu(props) {
  return (
    <nav>
      <ul className="text-(--color-background) uppercase text-8xl font-extralight w-lg justify-self-center flex flex-col gap-2">
        <li className="bg-(--color-foreground) px-4">
          <Link href="/projects">Projects</Link>
        </li>
        <li className="bg-(--color-foreground) px-4">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="bg-(--color-foreground) px-4">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
