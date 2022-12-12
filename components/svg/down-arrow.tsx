import React from "react"

type Props = {
  color: string
}

const DownArrow = ({ color }: Props) => {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.2375 0.5L7.5 6.06275L1.7625 0.5L0 2.21255L7.5 9.5L15 2.21255L13.2375 0.5Z"
        fill={color}
      />
    </svg>
  )
}

export default DownArrow
