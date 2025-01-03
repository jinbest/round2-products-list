import React from "react"

type Props = {
  color: string
}

const LeftArrow = ({ color }: Props) => {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 13.7375L3.43725 8L9 2.2625L7.28745 0.5L-3.27835e-07 8L7.28745 15.5L9 13.7375Z"
        fill={color}
      />
    </svg>
  )
}

export default LeftArrow
