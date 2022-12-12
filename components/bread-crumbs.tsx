import React from "react"
import RightArrow from "./svg/right-arrow"
import { useTranslation } from "react-i18next"
import { NavParams } from "../models/nav-params"
import Link from "next/link"

type Props = {
  data: NavParams[]
  color?: string
}

const BreadCrumbs = ({ data, color }: Props) => {
  const [t] = useTranslation()

  return (
    <div className="bread-crumbs">
      {data.map((item: NavParams, index: number) => {
        return (
          <React.Fragment key={index}>
            <Link href={item.link}>
              <a style={{ color: color ? color : "" }}>{t(item.name)}</a>
            </Link>
            {index < data.length - 1 && <RightArrow color={color ? color : "#4360FA"} />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default BreadCrumbs
