import React, { useRef, useState, useCallback, useEffect } from "react"
import Swiper from "react-id-swiper"
import Banner1 from "../../components/slider-banners/banner-1"
import Banner2 from "../../components/slider-banners/banner-2"
import Banner3 from "../../components/slider-banners/banner-3"
import _ from "lodash"
import { bannerData } from "../../static/mock/mock-data"

const sliderBG = ["#cbbbfa", "#4360fa", "#fc6530"]

const Section1 = () => {
  const thisData = _.cloneDeep(bannerData)

  const ref = useRef<any>(null)
  const [step, setStep] = useState(0)

  const goNext = () => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      ref.current.swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slidePrev()
    }
  }

  const updateIndex = useCallback(() => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      setStep(ref.current.swiper.realIndex)
    }
  }, [])

  useEffect(() => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      const swiperInstance = ref.current.swiper
      if (swiperInstance) {
        swiperInstance.on("slideChange", updateIndex)
      }
      return () => {
        if (swiperInstance) {
          swiperInstance.off("slideChange", updateIndex)
        }
      }
    }
  }, [updateIndex])

  const swiperParams = {
    loop: true,
  }

  useEffect(() => {
    const tendingCard = document.getElementById("banner-2-tending-card") as HTMLDivElement
    if (step === 1) {
      tendingCard.classList.add("banner-2-tending-card")
      tendingCard.classList.remove("hide")
    } else {
      tendingCard.classList.remove("banner-2-tending-card")
      tendingCard.classList.add("hide")
    }
  }, [step])

  useEffect(() => {
    const interval = setInterval(() => {
      goNext()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="slider-container" style={{ background: sliderBG[step] }}>
      {step === 1 && (
        <img className="banner-2-bg" src="img/home/banners/banner2-bg.png" alt="banner-2-bg" />
      )}
      <button className="slider-button" onClick={goPrev}>
        <span>
          <img src="/img/icons/arrow-left.png" alt="arrow-left" />
        </span>
      </button>
      <Swiper ref={ref} {...swiperParams}>
        <div className="slider-item-container">
          <Banner1 data={thisData[0]} />
        </div>
        <div className="slider-item-container">
          <Banner2 data={thisData[1]} />
        </div>
        <div className="slider-item-container">
          <Banner3 data={thisData[2]} />
        </div>
      </Swiper>
      <button className="slider-button" onClick={goNext}>
        <span>
          <img src="/img/icons/arrow-right.png" alt="arrow-right" />
        </span>
      </button>
    </div>
  )
}

export default Section1
