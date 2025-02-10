// 'use client';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import React from 'react';
// import Slider from 'react-slick';
import styles from '../styles/bigmenu.module.css';

export default function BigMenu(props) {

  return (
   <nav >
    <ul className="text-(--color-background) uppercase text-9xl font-extralight w-2xl justify-self-center flex flex-col gap-3">
      <li className="bg-(--color-foreground) px-4">Projects</li>
      <li className="bg-(--color-foreground) px-4">Contact</li>
      <li className="bg-(--color-foreground) px-4">About</li>
    </ul>
   </nav>
  );
}
