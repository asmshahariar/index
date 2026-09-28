import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import birthdayConfig from '../config/birthdayConfig';

function SliderScreen() {
  const swiperElRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    swiperInstanceRef.current = new Swiper(swiperElRef.current, {
      modules: [Autoplay, EffectCoverflow, Navigation],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      autoplay: { delay: 2000, disableOnInteraction: false },
      coverflowEffect: { rotate: 8, stretch: 0, depth: 200, modifier: 1, slideShadows: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      touchRatio: 1,
      resistance: true,
      resistanceRatio: 0.6,
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div id="sliderScreen" className="screen active">
      <div className="slider-container">
        <div className="swiper" ref={swiperElRef}>
          <div className="swiper-wrapper">
            {birthdayConfig.memories.map((src, i) => (
              <div className="swiper-slide" key={i}>
                <div className="slide-card">
                  <img src={src} alt={`Memory ${i + 1}`} />
                  <div className="slide-reflection" />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </div>
      </div>
    </div>
  );
}

export default SliderScreen;
