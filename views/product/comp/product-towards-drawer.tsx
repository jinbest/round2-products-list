import React from "react"
import Drawer from "@material-ui/core/Drawer"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  children?: any
}

const ProductTowardsDrawer = ({ open, setOpen, children }: Props) => {
  return (
    <Drawer
      className="product-towards-drawer"
      anchor="right"
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <div className="product-towards-drawer-container custom-scroll-bar">{children}</div>
    </Drawer>
  )
}

export default ProductTowardsDrawer
