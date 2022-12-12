import React from "react"
import { LookingForCardParam } from "../models/looking-for-card-param"
import { useTranslation } from "react-i18next"

type Props = {
  data: LookingForCardParam
}

const LookingForCard = ({ data }: Props) => {
  const [t] = useTranslation()

  return (
    <div className={data.vertical ? "looking-for-card looking-for-vertical" : "looking-for-card"}>
      <img src={data.img_src} alt={`looking-for-${data.alt}`} />
      <div>
        <p className="looking-for-title">{t(data.title)}</p>
        <p className="looking-for-content">{t(data.content)}</p>
      </div>
    </div>
  )
}

export default LookingForCard
