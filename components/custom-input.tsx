import React, { CSSProperties } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  value: string
  setValue: (val: string) => void
  placeholder?: string
  style?: CSSProperties
  className?: string
  required?: boolean
}

const CustomInput = (props: Props) => {
  const [t] = useTranslation()

  const { value, setValue, placeholder, style, className, required } = props

  return (
    <div className="custom-input">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        placeholder={placeholder ? t(placeholder) : ""}
        style={style ?? {}}
        className={className ?? ""}
        required={required}
      />
    </div>
  )
}

export default CustomInput
