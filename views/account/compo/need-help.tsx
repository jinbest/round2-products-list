import React from "react"
import { observer } from "mobx-react"
import { authStore } from "../../../store"
import { useTranslation } from "react-i18next"

const NeedHelp = () => {
  const [t] = useTranslation()

  return (
    <div className="account-details">
      <p className="details-title">{t(authStore.accountData.needHelp.title)}</p>
    </div>
  )
}

export default observer(NeedHelp)
