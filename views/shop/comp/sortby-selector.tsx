import React, { useState } from "react"
import useOnclickOutside from "react-cool-onclickoutside"
import UpArrow from "../../../components/svg/up-arrow"
import DownArrow from "../../../components/svg/down-arrow"
import { SelectorParam } from "../../../models/selector-param"
import { useTranslation } from "react-i18next"

type Props = {
  title: string
  options: SelectorParam[]
  selected: SelectorParam
  setSelected: (val: SelectorParam) => void
}

const SortbySelector = ({ title, options, selected, setSelected }: Props) => {
  const [t] = useTranslation()

  const [optionView, setOptionView] = useState(false)

  const refOption = useOnclickOutside(() => {
    setOptionView(false)
  })

  return (
    <div className="sortby-selector" ref={refOption}>
      <div
        className="selector-header"
        onClick={() => {
          setOptionView(!optionView)
        }}
      >
        <p>{t(title)}</p>
        {optionView ? <UpArrow color="#505050" /> : <DownArrow color="#505050" />}
      </div>
      {optionView ? (
        <div className="selector-options">
          {options.map((item: SelectorParam, index: number) => {
            return (
              <p
                key={index}
                onClick={() => {
                  setSelected(options[index])
                  setOptionView(false)
                }}
                style={{ background: item.code === selected.code ? "#D4DFFC" : "" }}
              >
                {t(item.name)}
              </p>
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default SortbySelector
