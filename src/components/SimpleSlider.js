'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import React from 'react';
import Slider from 'react-slick';
import styles from '../styles/slider.module.css';

export default function SimpleSlider() {
  const { scrollYProgress } = useScroll({
    // target: ref,
    // offset: ['end end', 'start start'],
  });

  const arrowColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#f00', '#0f0', '#00f'],
  );

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <motion.div
        className="z-100 absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/4 text-8xl font-semibold [text-shadow:_2px_5px_0_var(--color-foreground)]"
        // style={{ ...style, display: 'block', background: 'green' }}
        onClick={onClick}
        style={{ color: arrowColor }}
      >
        &gt;
      </motion.div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <motion.div
        className="z-100 absolute top-1/2 left-0 -translate-y-1/2 translate-x-1/4 text-8xl font-semibold [text-shadow:_2px_5px_0_var(--color-foreground)]"
        // style={{ ...style, display: 'block', background: 'green' }}
        onClick={onClick}
        style={{ color: arrowColor }}
      >
        &lt;
      </motion.div>
    );
  }

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    // arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="leading-0">
      <Slider {...settings}>
        <div>
          <img src="/images/vector-slide-6.webp" className={styles.flick} />
        </div>
        <div>
          <a href="/projects/earthsong">
            <img
              src="/images/earthsong-slide-2.webp"
              className={styles.flick}
            />
          </a>
        </div>
        <div>
          <img src="/images/goodwater-slide-3.webp" className={styles.flick} />
        </div>
      </Slider>
    </div>
  );
}
