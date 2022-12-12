import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import PriceSlider from "./price-slider"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core"
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
import {
  CategoryParam,
  FilterCheckItemParam,
  BrandParam,
  ProductParam,
  SupplierParam,
} from "../../../models/shop-page-params"

const CHECKED_TYPES = {
  category: "category",
  esthetic: "esthetic",
  brand: "brand",
  product: "product",
  storage: "storage",
  colour: "colour",
  carrier: "carrier",
  vendor: "vendor",
  availability: "availability",
}

type Props = {
  priceValue: number[]
  setPriceValue: (val: number[]) => void
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

const ShopFilter = ({
  priceValue,
  setPriceValue,
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
  const [t] = useTranslation()

  const [subBrand, setSubBrand] = useState(5)
  const [subProduct, setSubProduct] = useState(5)

  useEffect(() => {
    setSubProduct(5)
  }, [checkedBrands])

  const handleToggleCheckArray = (data: number[], id: number, type: string) => {
    if (data.includes(id)) {
      const index = data.indexOf(id)
      if (index > -1) {
        data.splice(index, 1)
      }
    } else {
      data.push(id)
    }
    if (type === CHECKED_TYPES.category) {
      setCheckedCategories([...data])
    } else if (type === CHECKED_TYPES.esthetic) {
      setCheckedEsthetics([...data])
    } else if (type === CHECKED_TYPES.brand) {
      setCheckedBrands([...data])
    } else if (type === CHECKED_TYPES.product) {
      setCheckedProducts([...data])
    } else if (type === CHECKED_TYPES.storage) {
      setCheckedStorages([...data])
    } else if (type === CHECKED_TYPES.colour) {
      setCheckedColours([...data])
    } else if (type === CHECKED_TYPES.carrier) {
      setCheckedCarriers([...data])
    } else if (type === CHECKED_TYPES.vendor) {
      setCheckedVendors([...data])
    } else if (type === CHECKED_TYPES.availability) {
      setCheckedAvailabilities([...data])
    }
  }

  const _filteredProducts = () => {
    if (!checkedBrands.length) {
      return []
    }
    return _.filter(PRODUCTS, (o) => checkedBrands.includes(o.brand_id))
  }

  return (
    <div className="shop-filter-container">
      <div className="shop-filter-price-desktop">
        <PriceSlider value={priceValue} setValue={setPriceValue} />
      </div>

      <div className="shop-filter-accordion">
        <div className="shop-filter-price-mobile">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="device-type-content"
              id="device-type"
            >
              <Typography className="accordion-summary">{t("Price")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PriceSlider value={priceValue} setValue={setPriceValue} />
            </AccordionDetails>
          </Accordion>
        </div>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="device-type-content"
            id="device-type"
          >
            <Typography className="accordion-summary">{t("Device Type")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_.sortBy(DEVICE_CATEGORIES, (o) => o.sort_order).map(
                (item: CategoryParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedCategories.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(
                              checkedCategories,
                              item.id,
                              CHECKED_TYPES.category
                            )
                          }}
                          name={CHECKED_TYPES.category}
                          color="primary"
                        />
                      }
                      label={t(item.name)}
                    />
                  )
                }
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="esthetic-condition-content"
            id="esthetic-condition"
          >
            <Typography className="accordion-summary">{t("Esthetic Condition")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_.sortBy(ESTHETIC_CONDITIONS, (o) => o.order).map(
                (item: FilterCheckItemParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedEsthetics.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(
                              checkedEsthetics,
                              item.id,
                              CHECKED_TYPES.esthetic
                            )
                          }}
                          name={CHECKED_TYPES.esthetic}
                          color="primary"
                        />
                      }
                      label={t(item.label)}
                    />
                  )
                }
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="brand-content"
            id="brand"
          >
            <Typography className="accordion-summary">{t("Brand")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_.sortBy(BRANDS, (o) => o.sort_order)
                .slice(0, subBrand)
                .map((item: BrandParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedBrands.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(checkedBrands, item.id, CHECKED_TYPES.brand)
                          }}
                          name={CHECKED_TYPES.brand}
                          color="primary"
                        />
                      }
                      label={t(item.name)}
                    />
                  )
                })}
              {BRANDS.length > subBrand ? (
                <p
                  className="filter-see-more"
                  onClick={() => {
                    setSubBrand(BRANDS.length)
                  }}
                >
                  {t("See More")}
                </p>
              ) : (
                <></>
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="product-content"
            id="product"
          >
            <Typography className="accordion-summary">{t("Model")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_filteredProducts()
                .slice(0, subProduct)
                .map((item: ProductParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedProducts.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(checkedProducts, item.id, CHECKED_TYPES.product)
                          }}
                          name={CHECKED_TYPES.product}
                          color="primary"
                        />
                      }
                      label={t(item.name)}
                    />
                  )
                })}
              {_filteredProducts().length > subProduct ? (
                <p
                  className="filter-see-more"
                  onClick={() => {
                    setSubProduct(_filteredProducts().length)
                  }}
                >
                  {t("See More")}
                </p>
              ) : (
                <></>
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="storage-content"
            id="storage"
          >
            <Typography className="accordion-summary">{t("Storage (GB)")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_.sortBy(DEVICE_STORAGES, (o) => o.order).map(
                (item: FilterCheckItemParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedStorages.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(checkedStorages, item.id, CHECKED_TYPES.storage)
                          }}
                          name={CHECKED_TYPES.storage}
                          color="primary"
                        />
                      }
                      label={t(item.label)}
                    />
                  )
                }
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="colour-content"
            id="colour"
          >
            <Typography className="accordion-summary">{t("Colour")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_.sortBy(DEVICE_COLORS, (o) => o.order).map(
                (item: FilterCheckItemParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedColours.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(checkedColours, item.id, CHECKED_TYPES.colour)
                          }}
                          name={CHECKED_TYPES.colour}
                          color="primary"
                        />
                      }
                      label={t(item.label)}
                    />
                  )
                }
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="carrier-content"
            id="carrier"
          >
            <Typography className="accordion-summary">{t("Carrier")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_.sortBy(CARRIERS, (o) => o.order).map(
                (item: FilterCheckItemParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedCarriers.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(checkedCarriers, item.id, CHECKED_TYPES.carrier)
                          }}
                          name={CHECKED_TYPES.carrier}
                          color="primary"
                        />
                      }
                      label={t(item.label)}
                    />
                  )
                }
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="vendor-content"
            id="vendor"
          >
            <Typography className="accordion-summary">{t("Vendor")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {SUPPLIERS.map((item: SupplierParam, index: number) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={checkedVendors.includes(item.id)}
                        onChange={() => {
                          handleToggleCheckArray(checkedVendors, item.id, CHECKED_TYPES.vendor)
                        }}
                        name={CHECKED_TYPES.vendor}
                        color="primary"
                      />
                    }
                    label={t(item.name)}
                  />
                )
              })}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="availability-content"
            id="availability"
          >
            <Typography className="accordion-summary">{t("Availability")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup className="shop-filter-checkbox">
              {_.sortBy(AVAILABILITIES, (o) => o.order).map(
                (item: FilterCheckItemParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedAvailabilities.includes(item.id)}
                          onChange={() => {
                            handleToggleCheckArray(
                              checkedAvailabilities,
                              item.id,
                              CHECKED_TYPES.availability
                            )
                          }}
                          name={CHECKED_TYPES.availability}
                          color="primary"
                        />
                      }
                      label={t(item.label)}
                    />
                  )
                }
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default ShopFilter
