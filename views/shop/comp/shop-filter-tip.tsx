import React from "react"
import {
  DEVICE_CATEGORIES,
  ESTHETIC_CONDITIONS,
  BRANDS,
  PRODUCTS,
  DEVICE_STORAGES,
  DEVICE_COLORS,
  CARRIERS,
  SUPPLIERS,
  AVAILABILITIES,
} from "../../../static/mock/shop"
import _ from "lodash"
import Close from "@material-ui/icons/Close"

type Props = {
  checkedCategories: number[]
  setCheckedCategories: (val: number[]) => void
  checkedEsthetics: number[]
  setCheckedEsthetics: (val: number[]) => void
  checkedBrands: number[]
  setCheckedBrands: (val: number[]) => void
  checkedProducts: number[]
  setCheckedProducts: (val: number[]) => void
  checkedStorages: number[]
  setCheckedStorages: (val: number[]) => void
  checkedColours: number[]
  setCheckedColours: (val: number[]) => void
  checkedCarriers: number[]
  setCheckedCarriers: (val: number[]) => void
  checkedVendors: number[]
  setCheckedVendors: (val: number[]) => void
  checkedAvailabilities: number[]
  setCheckedAvailabilities: (val: number[]) => void
}

const ShopFilterTip = ({
  checkedCategories,
  setCheckedCategories,
  checkedEsthetics,
  setCheckedEsthetics,
  checkedBrands,
  setCheckedBrands,
  checkedProducts,
  setCheckedProducts,
  checkedStorages,
  setCheckedStorages,
  checkedColours,
  setCheckedColours,
  checkedCarriers,
  setCheckedCarriers,
  checkedVendors,
  setCheckedVendors,
  checkedAvailabilities,
  setCheckedAvailabilities,
}: Props) => {
  return (
    <div className="shop-filtered-tip">
      {checkedCategories.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedCategories.indexOf(it)
                if (itIndex > -1) {
                  checkedCategories.splice(itIndex, 1)
                  setCheckedCategories([...checkedCategories])
                }
              }}
            />
            <p>{_.find(DEVICE_CATEGORIES, { id: it })?.name}</p>
          </div>
        )
      })}
      {checkedEsthetics.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedEsthetics.indexOf(it)
                if (itIndex > -1) {
                  checkedEsthetics.splice(itIndex, 1)
                  setCheckedEsthetics([...checkedEsthetics])
                }
              }}
            />
            <p>{_.find(ESTHETIC_CONDITIONS, { id: it })?.label}</p>
          </div>
        )
      })}
      {checkedBrands.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedBrands.indexOf(it)
                if (itIndex > -1) {
                  checkedBrands.splice(itIndex, 1)
                  setCheckedBrands([...checkedBrands])
                }
              }}
            />
            <p>{_.find(BRANDS, { id: it })?.name}</p>
          </div>
        )
      })}
      {checkedProducts.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedProducts.indexOf(it)
                if (itIndex > -1) {
                  checkedProducts.splice(itIndex, 1)
                  setCheckedProducts([...checkedProducts])
                }
              }}
            />
            <p>{_.find(PRODUCTS, { id: it })?.name}</p>
          </div>
        )
      })}
      {checkedStorages.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedStorages.indexOf(it)
                if (itIndex > -1) {
                  checkedStorages.splice(itIndex, 1)
                  setCheckedStorages([...checkedStorages])
                }
              }}
            />
            <p>{_.find(DEVICE_STORAGES, { id: it })?.label}</p>
          </div>
        )
      })}
      {checkedColours.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedColours.indexOf(it)
                if (itIndex > -1) {
                  checkedColours.splice(itIndex, 1)
                  setCheckedColours([...checkedColours])
                }
              }}
            />
            <p>{_.find(DEVICE_COLORS, { id: it })?.label}</p>
          </div>
        )
      })}
      {checkedCarriers.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedCarriers.indexOf(it)
                if (itIndex > -1) {
                  checkedCarriers.splice(itIndex, 1)
                  setCheckedCarriers([...checkedCarriers])
                }
              }}
            />
            <p>{_.find(CARRIERS, { id: it })?.label}</p>
          </div>
        )
      })}
      {checkedVendors.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedVendors.indexOf(it)
                if (itIndex > -1) {
                  checkedVendors.splice(itIndex, 1)
                  setCheckedVendors([...checkedVendors])
                }
              }}
            />
            <p>{_.find(SUPPLIERS, { id: it })?.name}</p>
          </div>
        )
      })}
      {checkedAvailabilities.map((it: number) => {
        return (
          <div key={it}>
            <Close
              onClick={() => {
                const itIndex = checkedAvailabilities.indexOf(it)
                if (itIndex > -1) {
                  checkedAvailabilities.splice(itIndex, 1)
                  setCheckedAvailabilities([...checkedAvailabilities])
                }
              }}
            />
            <p>{_.find(AVAILABILITIES, { id: it })?.label}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ShopFilterTip
