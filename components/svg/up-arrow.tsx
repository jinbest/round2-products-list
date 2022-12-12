import React from "react"

type Props = {
  color: string
}

const UpArrow = ({ color }: Props) => {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.7625 9.5L7.5 3.93725L13.2375 9.5L15 7.78745L7.5 0.499999L1.49716e-07 7.78745L1.7625 9.5Z"
        fill={color}
      />
    </svg>
  )
}

export default UpArrow
