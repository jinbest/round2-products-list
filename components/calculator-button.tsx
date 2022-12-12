import React from "react"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

type Props = {
  addCarts: number
  setAddCarts: (val: number) => void
  minValue?: number
}

const CalculatorButton = ({ addCarts, setAddCarts, minValue }: Props) => {
  return (
    <div className="calculator-button">
      <div
        onClick={() => {
          if (minValue) {
            setAddCarts(Math.max(addCarts - 1, minValue))
          } else {
            setAddCarts(Math.max(addCarts - 1, 0))
          }
        }}
      >
        <RemoveIcon />
      </div>
      <p>{addCarts}</p>
      <div
        onClick={() => {
          setAddCarts(addCarts + 1)
        }}
      >
        <AddIcon />
      </div>
    </div>
  )
}

export default CalculatorButton
