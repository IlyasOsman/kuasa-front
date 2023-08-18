import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import LeardershipCard from "./LeadershipCard";
import { leaders } from "../constants";
import styles from "../style";

const Leadership = () => (
  <section id="leaders" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2 className={styles.heading2}>
        Our club <br className="sm:block hidden" /> leaders
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
          Kenyatta University Aerospace engineering Students Association club leadership.
        </p>
      </div>
    </div>

    <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
      {/* Carousel for desktop and large size devices */}
      <CarouselProvider
        naturalSlideWidth={100}
        isIntrinsicHeight={true}
        totalSlides={leaders.length}
        visibleSlides={4}
        step={1}
        infinite={true}
        className="lg:block hidden">
        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          <Slider>
            {leaders.map((card) => (
              <Slide key={card.id} index={card.id}>
                <div className="flex justify-center">
                  <LeardershipCard {...card} />
                </div>
              </Slide>
            ))}
          </Slider>
        </div>
        <ButtonBack
          role="button"
          aria-label="slide backward"
          className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
          id="prev">
          <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ButtonBack>
        <ButtonNext
          role="button"
          aria-label="slide forward"
          className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          id="next">
          <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ButtonNext>
      </CarouselProvider>

      {/* Carousel for tablet and medium size devices */}
      <CarouselProvider
        naturalSlideWidth={100}
        isIntrinsicHeight={true}
        totalSlides={leaders.length}
        visibleSlides={2}
        step={1}
        infinite={true}
        className="lg:hidden md:block hidden">
        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          <Slider>
            {leaders.map((card) => (
              <Slide key={card.id} index={card.id}>
                <div className="flex justify-center">
                  <LeardershipCard {...card} />
                </div>
              </Slide>
            ))}
          </Slider>
        </div>
        <ButtonBack
          role="button"
          aria-label="slide backward"
          className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
          id="prev">
          <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ButtonBack>
        <ButtonNext
          role="button"
          aria-label="slide forward"
          className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          id="next">
          <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ButtonNext>
      </CarouselProvider>

      {/* Carousel for small size devices */}
      <CarouselProvider
        naturalSlideWidth={100}
        isIntrinsicHeight={true}
        totalSlides={leaders.length}
        visibleSlides={1}
        step={1}
        infinite={true}
        className="block md:hidden">
        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          <Slider>
            {leaders.map((card) => (
              <Slide key={card.id} index={card.id}>
                <div className="flex justify-center">
                  <LeardershipCard {...card} />
                </div>
              </Slide>
            ))}
          </Slider>
        </div>
        <ButtonBack
          role="button"
          aria-label="slide backward"
          className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
          id="prev">
          <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ButtonBack>
        <ButtonNext
          role="button"
          aria-label="slide forward"
          className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          id="next">
          <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ButtonNext>
      </CarouselProvider>
    </div>
  </section>
);

export default Leadership;
