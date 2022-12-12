import React from "react"

type Props = {
  color?: string
}

const BackSVG = ({ color }: Props) => {
  return (
    <div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.125 23C43.125 17.6625 41.0047 12.5436 37.2305 8.76948C33.4564 4.99531 28.3375 2.875 23 2.875C17.6625 2.875 12.5436 4.99531 8.76947 8.76948C4.9953 12.5436 2.875 17.6625 2.875 23C2.875 28.3375 4.99531 33.4564 8.76948 37.2305C12.5436 41.0047 17.6625 43.125 23 43.125C28.3375 43.125 33.4564 41.0047 37.2305 37.2305C41.0047 33.4564 43.125 28.3375 43.125 23ZM46 23C46 16.9 43.5768 11.0499 39.2635 6.73654C34.9501 2.4232 29.1 -1.272e-06 23 -1.00536e-06C16.9 -7.38723e-07 11.0499 2.42321 6.73654 6.73654C2.42321 11.0499 -1.272e-06 16.9 -1.00536e-06 23C-7.38723e-07 29.1 2.42321 34.9501 6.73654 39.2635C11.0499 43.5768 16.9 46 23 46C29.1 46 34.9501 43.5768 39.2635 39.2635C43.5768 34.9501 46 29.1 46 23Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.7947 34.865C27.9595 34.7006 28.0902 34.5054 28.1794 34.2905C28.2686 34.0755 28.3145 33.8451 28.3145 33.6124C28.3145 33.3797 28.2686 33.1492 28.1794 32.9343C28.0902 32.7193 27.9595 32.5241 27.7947 32.3598L18.4284 22.997L27.7947 13.6342C28.1269 13.302 28.3135 12.8514 28.3135 12.3816C28.3135 11.9118 28.1269 11.4612 27.7947 11.129C27.4625 10.7968 27.0119 10.6101 26.5421 10.6101C26.0723 10.6101 25.6217 10.7968 25.2895 11.129L14.6741 21.7444C14.5093 21.9087 14.3786 22.104 14.2894 22.3189C14.2002 22.5338 14.1543 22.7643 14.1543 22.997C14.1543 23.2297 14.2002 23.4601 14.2894 23.6751C14.3786 23.89 14.5093 24.0853 14.6741 24.2496L25.2895 34.865C25.4538 35.0298 25.649 35.1605 25.864 35.2497C26.0789 35.3389 26.3094 35.3848 26.5421 35.3848C26.7748 35.3848 27.0052 35.3389 27.2202 35.2497C27.4351 35.1605 27.6303 35.0298 27.7947 34.865Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

export default BackSVG
