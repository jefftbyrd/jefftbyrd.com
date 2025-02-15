'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';

export default function SimpleSlider() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };
  return (
    <Slider {...settings}>
      <div>
        <img src="/images/vector-slide-6.webp" />
      </div>
      <div>
        <a href="/projects/earthsong">
          <img src="/images/earthsong-slide-2.webp" />
        </a>
      </div>
      <div>
        <img src="/images/goodwater-slide-3.webp" />
      </div>
      <div>
        <img src="/images/uh-slide.webp" />
      </div>
    </Slider>
  );
}
