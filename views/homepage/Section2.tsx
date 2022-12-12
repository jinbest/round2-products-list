import React from "react"
import { LookingForCardParam } from "../../models/looking-for-card-param"
import _ from "lodash"
import LookingForCard from "../../components/looking-for-card"
import { useTranslation } from "react-i18next"
import { lookingFor } from "../../static/mock/mock-data"

const Section2 = () => {
  const [t] = useTranslation()

  const thisData = _.cloneDeep(lookingFor)
  const lookingData = _.sortBy(thisData, (o) => o.order)

  return (
    <div className="looking-for-container">
      <h3>{t("Find What You’re Looking For")}</h3>
      <div className="looking-for-cards">
        {lookingData.map((item: LookingForCardParam, index: number) => {
          return (
            <React.Fragment key={index}>
              {item.visible && (
                <div className={item.vertical ? "looking-vertical" : "looking-horizontal"}>
                  <LookingForCard data={item} />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Section2
