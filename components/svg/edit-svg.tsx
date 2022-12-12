import React from "react"

type Props = {
  color?: string
}

const EditIcon = ({ color }: Props) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.6856 1.49759L12.5166 0.317459C12.0966 -0.106471 11.4122 -0.106471 10.9912 0.317459L7.92331 3.41673H1.07823C0.483502 3.41673 0 3.90482 0 4.5052V12.9116C0 13.512 0.483502 14.0001 1.07823 14.0001H9.40559C10.0003 14.0001 10.4838 13.512 10.4838 12.9116V6.26852L13.6845 3.03749C14.1056 2.61356 14.1056 1.92266 13.6856 1.49759ZM9.91634 12.9116C9.91634 13.1958 9.68707 13.4272 9.40559 13.4272H1.07823C0.796757 13.4272 0.567491 13.1958 0.567491 12.9116V4.5052C0.567491 4.22105 0.796757 3.98961 1.07823 3.98961H7.35582L3.29031 8.09371C3.13936 8.24609 3.05197 8.44775 3.04175 8.662L2.97025 10.2374C2.9589 10.478 3.0497 10.7141 3.21881 10.8848C3.38792 11.0555 3.62173 11.146 3.86007 11.1357L5.42067 11.0635C5.52736 11.0589 5.62951 11.0337 5.72598 10.9913C5.82132 10.9489 5.90871 10.8882 5.98476 10.8126L9.91747 6.84254V12.9116H9.91634ZM9.91634 6.03135L5.58184 10.407C5.5319 10.4574 5.46494 10.4872 5.39457 10.4906L3.83397 10.5628C3.75338 10.5663 3.67734 10.5365 3.62059 10.4792C3.56384 10.4219 3.53433 10.3451 3.53774 10.2638L3.60924 8.68836C3.61265 8.61617 3.64216 8.54972 3.6921 8.49931L8.15825 3.99075L8.72574 3.41788L9.8925 2.24004L11.7834 4.14887L9.91634 6.03135ZM13.2838 2.63189L12.1852 3.74213L10.2931 1.8333L11.3929 0.723057C11.5916 0.521404 11.9162 0.521404 12.1148 0.723057L13.2827 1.90204C13.4824 2.10369 13.4824 2.43138 13.2838 2.63189Z"
        fill={color ? color : "black"}
      />
    </svg>
  )
}

export default EditIcon