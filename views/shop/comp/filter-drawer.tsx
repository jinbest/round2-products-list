import React from "react"
import Drawer from "@material-ui/core/Drawer"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  children?: any
}

const FilterDrawer = ({ open, setOpen, children }: Props) => {
  return (
    <Drawer
      className="filter-drawer"
      anchor="right"
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <div className="filter-drawer-container custom-scroll-bar">{children}</div>
    </Drawer>
  )
}

export default FilterDrawer
