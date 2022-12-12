import React, { useEffect, useState } from "react"
import i18n from "../i18-next/i18n"
import { useTranslation } from "react-i18next"

const LangDropdown = () => {
  const [t] = useTranslation()

  const options = ["EN", "FR"]

  const [state, setState] = useState("EN")

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const la = event.target.value
    let cntLang = "en"
    setState(la)
    cntLang = la === "EN" ? "en" : "fr"
    i18n.changeLanguage(la === "EN" ? "en" : "fr")
    if (typeof window !== "undefined") window.localStorage.setItem("cntLang", cntLang)
  }

  useEffect(() => {
    const cntLang =
      typeof window !== "undefined" ? window.localStorage.getItem("cntLang") || "en" : "en"
    cntLang === "en" ? setState(options[0]) : setState(options[1])
    i18n.changeLanguage(cntLang)
  }, [])

  return (
    <div>
      <select className="lang-selector" value={state} onChange={handleChange}>
        {options.map((item: string, index: number) => {
          return (
            <option value={item} key={index}>
              {t(item)}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default LangDropdown
