import React from "react"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import { useTranslation } from "react-i18next"

function valuetext(value: number) {
  return `$${value}`
}

type Props = {
  value: number[]
  setValue: (val: number[]) => void
}

const PriceSlider = ({ value, setValue }: Props) => {
  const [t] = useTranslation()

  return (
    <div className="price-slider">
      <Typography id="range-slider" gutterBottom>
        {t("Price")}
      </Typography>
      <Slider
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue as number[])
        }}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={1000}
        min={50}
      />
      <div className="slider-label">
        <div>
          <p>{`${t("Min")} ($)`}</p>
          <p style={{ color: "black" }}>{value[0]}</p>
        </div>
        <div>
          <p>{`${t("Max")} ($)`}</p>
          <p style={{ color: "black" }}>{value[1]}</p>
        </div>
      </div>
    </div>
  )
}

export default PriceSlider
