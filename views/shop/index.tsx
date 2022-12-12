import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import BreadCrumbs from "../../components/bread-crumbs"
import ShopFilter from "./comp/shop-filter"
import { ProductParam } from "../../models/shop-page-params"
import { formatWarranty } from "../../service/hepler"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { SelectorParam } from "../../models/selector-param"
import { AVAILABILITIES, DEVICE_STORAGES, SORT_OPTIONS } from "../../static/mock/shop"
import dynamic from "next/dynamic"
import { PRODUCTS, BRANDS } from "../../static/mock/shop"
import ShopFilterTip from "./comp/shop-filter-tip"
import Setting from "../../components/svg/setting"
import FilterDrawer from "./comp/filter-drawer"
import { findCommonElement, RangeOfStorage, CheckAvailable } from "../../service/hepler"
import _, { isEmpty } from "lodash"
import { NavParams } from "../../models/nav-params"
import { useRouter } from "next/router"
import SortbySelector from "./comp/sortby-selector"

const DynamicSwitch = dynamic(() => import("@material-ui/core/Switch"), { ssr: false }) as any

const Shop = () => {
  const [t] = useTranslation()
  const router = useRouter()

  const [priceValue, setPriceValue] = useState<number[]>([50, 800])
  const [checkedCategories, setCheckedCategories] = useState<number[]>([] as number[])
  const [checkedEsthetics, setCheckedEsthetics] = useState<number[]>([] as number[])
  const [checkedBrands, setCheckedBrands] = useState<number[]>([] as number[])
  const [checkedProducts, setCheckedProducts] = useState<number[]>([] as number[])
  const [checkedStorages, setCheckedStorages] = useState<number[]>([] as number[])
  const [checkedColours, setCheckedColours] = useState<number[]>([] as number[])
  const [checkedCarriers, setCheckedCarriers] = useState<number[]>([] as number[])
  const [checkedVendors, setCheckedVendors] = useState<number[]>([] as number[])
  const [checkedAvailabilities, setCheckedAvailabilities] = useState<number[]>([] as number[])

  const [switchChecked, setSwitchChecked] = useState(false)
  const [sortBy, setSortBy] = useState<SelectorParam>({} as SelectorParam)
  const [filterDrawerView, setFilterDrawerView] = useState(false)

  const [filteredProducts, setFilteredProducts] = useState<ProductParam[]>(PRODUCTS)
  const [breadData, setBreadData] = useState<NavParams[]>([] as NavParams[])

  useEffect(() => {
    const tmpBreadData = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Shop",
        link: "/shop",
      },
    ]
    if (!isEmpty(router.query)) {
      if (router.query.brand) {
        const brandName = router.query.brand as string
        const brand = _.find(BRANDS, { name: brandName })
        if (brand && !isEmpty(brand)) {
          tmpBreadData.push({
            name: brandName,
            link: `/shop?brand=${brandName}`,
          })
          const cntCheckBreads = [brand.id]
          setCheckedBrands(cntCheckBreads)
        }
      }
    } else {
      tmpBreadData.push({
        name: "All Devices",
        link: "/shop",
      })
      setCheckedBrands([])
    }
    setBreadData(tmpBreadData)
  }, [router])

  const _filteringProducts_ = () => {
    const result = [] as ProductParam[]
    PRODUCTS.forEach((item: ProductParam) => {
      let status = true
      if (item.cost < priceValue[0] || item.cost > priceValue[1]) {
        status = false
        return
      }
      if (checkedCategories.length && !findCommonElement(checkedCategories, item.category)) {
        status = false
        return
      }
      if (checkedEsthetics.length && !checkedEsthetics.includes(item.esthetic_id)) {
        status = false
        return
      }
      if (checkedBrands.length && !checkedBrands.includes(item.brand_id)) {
        status = false
        return
      }
      if (checkedProducts.length && !checkedProducts.includes(item.id)) {
        status = false
        return
      }
      if (
        checkedStorages.length &&
        !RangeOfStorage(item.storage, DEVICE_STORAGES, checkedStorages)
      ) {
        status = false
        return
      }
      if (checkedColours.length && !checkedColours.includes(item.color_id)) {
        status = false
        return
      }
      if (checkedCarriers.length && !checkedCarriers.includes(item.carrier_id)) {
        status = false
        return
      }
      if (checkedVendors.length && !checkedVendors.includes(item.supplier_id)) {
        status = false
        return
      }
      if (
        checkedAvailabilities.length &&
        !CheckAvailable(checkedAvailabilities, AVAILABILITIES, item)
      ) {
        status = false
        return
      }
      if (switchChecked && !item.require_stock) {
        status = false
        return
      }

      if (status) {
        result.push(item)
      }
    })

    if (!isEmpty(sortBy)) {
      if (sortBy.code === 3) {
        return _.sortBy(result, (o) => o.cost)
      } else if (sortBy.code === 4) {
        return _.sortBy(result, (o) => o.cost).reverse()
      }
    }

    return result
  }

  useEffect(() => {
    const newFiltered = _filteringProducts_()
    setFilteredProducts(newFiltered)
  }, [
    priceValue,
    checkedCategories,
    checkedEsthetics,
    checkedBrands,
    checkedProducts,
    checkedStorages,
    checkedColours,
    checkedCarriers,
    checkedVendors,
    checkedAvailabilities,
    switchChecked,
    sortBy,
  ])

  return (
    <div className="shop">
      <div className="container">
        {!isEmpty(breadData) && <BreadCrumbs data={breadData} />}

        <div className="shop-contents">
          <div className="shop-filter-desktop">
            <ShopFilter
              priceValue={priceValue}
              setPriceValue={setPriceValue}
              checkedCategories={checkedCategories}
              setCheckedCategories={setCheckedCategories}
              checkedEsthetics={checkedEsthetics}
              setCheckedEsthetics={setCheckedEsthetics}
              checkedBrands={checkedBrands}
              setCheckedBrands={setCheckedBrands}
              checkedProducts={checkedProducts}
              setCheckedProducts={setCheckedProducts}
              checkedStorages={checkedStorages}
              setCheckedStorages={setCheckedStorages}
              checkedColours={checkedColours}
              setCheckedColours={setCheckedColours}
              checkedCarriers={checkedCarriers}
              setCheckedCarriers={setCheckedCarriers}
              checkedVendors={checkedVendors}
              setCheckedVendors={setCheckedVendors}
              checkedAvailabilities={checkedAvailabilities}
              setCheckedAvailabilities={setCheckedAvailabilities}
            />
          </div>

          <div className="shop-data-viewer">
            <div className="shop-tip-switch-sortby">
              <div className="shop-filter-tip-container">
                <ShopFilterTip
                  checkedCategories={checkedCategories}
                  setCheckedCategories={setCheckedCategories}
                  checkedEsthetics={checkedEsthetics}
                  setCheckedEsthetics={setCheckedEsthetics}
                  checkedBrands={checkedBrands}
                  setCheckedBrands={setCheckedBrands}
                  checkedProducts={checkedProducts}
                  setCheckedProducts={setCheckedProducts}
                  checkedStorages={checkedStorages}
                  setCheckedStorages={setCheckedStorages}
                  checkedColours={checkedColours}
                  setCheckedColours={setCheckedColours}
                  checkedCarriers={checkedCarriers}
                  setCheckedCarriers={setCheckedCarriers}
                  checkedVendors={checkedVendors}
                  setCheckedVendors={setCheckedVendors}
                  checkedAvailabilities={checkedAvailabilities}
                  setCheckedAvailabilities={setCheckedAvailabilities}
                />
              </div>
              <div className="switch-and-sortby">
                <FormControlLabel
                  value="start"
                  style={{ minWidth: "155px" }}
                  control={
                    <DynamicSwitch
                      color="primary"
                      className="shop-switch"
                      checked={switchChecked}
                      onChange={() => {
                        setSwitchChecked(!switchChecked)
                      }}
                    />
                  }
                  label={t("In-stock Only")}
                  labelPlacement="start"
                />
                <div className="sort-by-selector">
                  <SortbySelector
                    title="Sort By"
                    options={SORT_OPTIONS}
                    selected={sortBy}
                    setSelected={setSortBy}
                  />
                  <div
                    className="shop-mobile-filter-switcher"
                    onClick={() => {
                      setFilterDrawerView(true)
                    }}
                  >
                    <Setting />
                    <p>{t("Filter")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shop-product-container">
              {filteredProducts.map((item: ProductParam, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      router.push(`/product/${item.id}`)
                    }}
                  >
                    <img src={item.img_src} alt={item.name} />
                    <div>
                      <h2>{item.name}</h2>
                      <p>{item.description}</p>
                      <p className="shop-cost">{`$${item.cost}`}</p>
                      <p className="as-low-as">{`${t("As low as")} ${item.short_description}`}</p>
                      <p className="shop-warranty">{`${t("Warranty")}: ${formatWarranty(
                        item.included_warranty_duration_month,
                        "MONTH"
                      )}`}</p>
                      <button>{t("Add to favourites")}</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <FilterDrawer open={filterDrawerView} setOpen={setFilterDrawerView}>
        <ShopFilter
          priceValue={priceValue}
          setPriceValue={setPriceValue}
          checkedCategories={checkedCategories}
          setCheckedCategories={setCheckedCategories}
          checkedEsthetics={checkedEsthetics}
          setCheckedEsthetics={setCheckedEsthetics}
          checkedBrands={checkedBrands}
          setCheckedBrands={setCheckedBrands}
          checkedProducts={checkedProducts}
          setCheckedProducts={setCheckedProducts}
          checkedStorages={checkedStorages}
          setCheckedStorages={setCheckedStorages}
          checkedColours={checkedColours}
          setCheckedColours={setCheckedColours}
          checkedCarriers={checkedCarriers}
          setCheckedCarriers={setCheckedCarriers}
          checkedVendors={checkedVendors}
          setCheckedVendors={setCheckedVendors}
          checkedAvailabilities={checkedAvailabilities}
          setCheckedAvailabilities={setCheckedAvailabilities}
        />
      </FilterDrawer>
    </div>
  )
}

export default Shop
