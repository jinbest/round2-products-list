import React, { useState, useEffect } from "react"
import LinearProgress from "@material-ui/core/LinearProgress"
import { Theme, makeStyles } from "@material-ui/core/styles"
import { useTranslation } from "react-i18next"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

type StyleParam = {
  color: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: (props: StyleParam) => props.color ?? "#F36B26",
  },
}))

type Props = {
  value: number
}

const ProgressBar = ({ value }: Props) => {
  const [t] = useTranslation()

  const [label, setLabel] = useState("Cart")

  const param = {
    color: value === 100 ? "#4360FA" : "#F36B26",
  }
  const classes = useStyles(param)

  useEffect(() => {
    if (value < 20) {
      setLabel("Cart")
    } else if (value < 40) {
      setLabel("Account")
    } else if (value < 70) {
      setLabel("Shipping")
    } else if (value < 90) {
      setLabel("Payment")
    } else {
      setLabel("Confirmation")
    }
  }, [value])

  return (
    <div className="checkout-progress-bar">
      <div className="progress-label">
        <p>{t("Cart")}</p>
        <p>{t("Account")}</p>
        <p>{t("Shipping")}</p>
        <p>{t("Payment")}</p>
        <p>{t("Confirmation")}</p>
      </div>
      <LinearProgress
        variant="determinate"
        value={value}
        className="liner-custom-progress"
        classes={{
          root: classes.root,
          colorPrimary: classes.colorPrimary,
          bar: classes.bar,
        }}
      />
      <CircularProgressbar
        className="circular-custom-progress"
        value={value}
        text={t(label)}
        styles={buildStyles({
          textSize: "11px",
          pathColor: value === 100 ? "#4360FA" : "#F36B26",
          textColor: value === 100 ? "#4360FA" : "#F36B26",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  )
}

export default ProgressBar
