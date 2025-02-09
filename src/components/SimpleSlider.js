'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';

export default function SimpleSlider() {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };
  return (
    <Slider {...settings}>
      <div>
      <img src="/images/vector-slide-6.webp" />
      </div>
      <div>
      <img src="/images/earthsong-slide-2.webp" />
      </div>
    </Slider>
  );
}
