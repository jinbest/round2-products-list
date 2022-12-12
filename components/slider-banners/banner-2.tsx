import React from "react"
import { BannerDataParam } from "../../models/banners-param"
import Link from "next/link"
import { useTranslation } from "react-i18next"

type Props = {
  data: BannerDataParam
}

const Banner2 = ({ data }: Props) => {
  const [t] = useTranslation()

  return (
    <div className="slider-banner">
      <div className="slider-contents">
        <div className="banner-2-slider-contents">
          <h1>{t(data.title)}</h1>
          {data.content && <p>{t(data.content)}</p>}
          {data.button.visible && (
            <Link href={data.button.link}>
              <a>
                <button>{t(data.button.text)}</button>
              </a>
            </Link>
          )}
        </div>
      </div>
      <div className="slider-banner-img">
        <div className="banner-2-tending-card" id="banner-2-tending-card">
          <img className="tending-img" src="/img/home/banners/tending.png" alt="banner-2-tending" />
          <img
            className="banner-2-laptop"
            src="/img/home/banners/laptop.png"
            alt="banner-2-laptop"
          />
          <p className="banner-2-card-title">{t("Microsoft Surface 3")}</p>
          <p className="banner-2-card-content">{t("starting at $750")}</p>
        </div>
      </div>
    </div>
  )
}

export default Banner2
