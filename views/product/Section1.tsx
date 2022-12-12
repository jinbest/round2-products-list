import React, { useState, useEffect } from "react"
import { ProductParam } from "../../models/shop-page-params"
import BreadCrumbs from "../../components/bread-crumbs"
import _, { isEmpty } from "lodash"
import { useTranslation } from "react-i18next"
import {
  WorkWithParam,
  ProductColorParam,
  ProductStorageParam,
  ProductConditionParam,
  ProductSelectParam,
  QualityGradingParam,
  QualityGradingDataParam,
  ProductFaqParam,
  ProductFaqAnswerParam,
} from "../../models/product-details-param"
import {
  WORKS_WITH,
  PRODUCT_COLORS,
  PRODUCT_STORAGES,
  PRODUCT_CONDITIONS,
  PRODUCT_WARRANTY_OPTIONS,
  SIMILAR_PRODUCTS,
  QUALITY_GRADINGS,
  GRADING_PREVIEW,
  PRODUCT_FAQS,
} from "../../static/mock/product"
import { Checkbox, FormControlLabel, FormGroup, FormControl } from "@material-ui/core"
import useOnclickOutside from "react-cool-onclickoutside"
import { formatWarranty } from "../../service/hepler"
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined"
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined"
import ProductTowardsCertified from "./comp/product-towards-certified"
import ProductTowardsDrawer from "./comp/product-towards-drawer"
import LeftArrow from "../../components/svg/left-arrow"
import { NavParams } from "../../models/nav-params"

type Props = {
  product: ProductParam
}

const Section1 = ({ product }: Props) => {
  const [t] = useTranslation()

  const [work, setWork] = useState<WorkWithParam>(WORKS_WITH[0])
  const [selectedColor, setSelectedColor] = useState<ProductColorParam>(PRODUCT_COLORS[0])
  const [selectedStorage, setSelectedStorage] = useState<ProductStorageParam>(PRODUCT_STORAGES[0])
  const [selectedCondition, setSelectedCondition] = useState<ProductConditionParam>(
    {} as ProductConditionParam
  )
  const [deviceKit, setDeviceKit] = useState(false)
  const [screenProtector, setScreenProtector] = useState(false)
  const [selectedWarranty, setSelectedWarranty] = useState<ProductSelectParam>(
    PRODUCT_WARRANTY_OPTIONS[0]
  )
  const [showSelectWarranty, setShowSelectWarranty] = useState(false)
  const [selectedGrading, setSelectedGrading] = useState<QualityGradingParam>(QUALITY_GRADINGS[0])
  const [gradingPreview, setGradingPreview] = useState(GRADING_PREVIEW.front)
  const [towardsDrawer, setTowardsDrawer] = useState(false)
  const [breadData, setBreadData] = useState<NavParams[]>([] as NavParams[])

  const refOption = useOnclickOutside(() => {
    setShowSelectWarranty(false)
  })

  useEffect(() => {
    const filtered = _.filter(PRODUCT_CONDITIONS, (o) => o.availability)
    if (filtered && filtered.length) {
      setSelectedCondition(filtered[0])
    }
  }, [PRODUCT_CONDITIONS])

  useEffect(() => {
    const tmpBreadData = [
      {
        name: "Buy",
        link: "/shop",
      },
    ]
    if (product.brand && !isEmpty(product.brand)) {
      tmpBreadData.push({
        name: product.brand.name,
        link: `/shop?brand=${product.brand.name}`,
      })
    }
    tmpBreadData.push({
      name: product.name,
      link: `/product/${product.id}`,
    })
    setBreadData(tmpBreadData)
  }, [product])

  const _getWorkTheme_ = (item: WorkWithParam) => {
    if (work.id !== item.id) {
      return {}
    } else {
      return {
        background: "#28BC83",
        color: "white",
        border: "none",
      }
    }
  }

  return (
    <div className="product-section1">
      <div className="container">
        {!isEmpty(breadData) && <BreadCrumbs data={breadData} color="black" />}

        <div className="product-contents">
          <div className="product-explanation">
            <div className="product-screens">
              <div className="main-screens">
                <div className="product-front-screen">
                  <img src={product.img_src} alt={product.name} />
                  {/* <img src="/img/product/screens/front.svg" alt={product.name} /> */}
                </div>
                <div className="product-partial-screens">
                  <div>
                    <img src="/img/product/screens/front.svg" alt="product-front" />
                  </div>
                  <div>
                    <img src="/img/product/screens/beside.svg" alt="product-beside" />
                  </div>
                </div>
              </div>

              <div className="product-abstract">
                <h1>{product.name}</h1>

                <div className="product-front-screen-mobile">
                  <img src={product.img_src} alt={product.name} />
                </div>

                <h2>{t("Works with")}</h2>
                <div className="works-with">
                  {WORKS_WITH.map((item: WorkWithParam, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setWork(item)
                        }}
                        style={_getWorkTheme_(item)}
                      >
                        {item.img_src ? (
                          <img src={item.img_src} alt={item.name} />
                        ) : (
                          <p>{item.name}</p>
                        )}
                      </div>
                    )
                  })}
                </div>

                <h2>{`${t("Starting From")} $435.00 - $820.00`}</h2>

                <h2>{t("Colour")}</h2>
                <div className="product-colors">
                  {PRODUCT_COLORS.map((item: ProductColorParam, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          background: item.color,
                          border: selectedColor.id === item.id ? "5px solid #BDBFC3" : "",
                          opacity: selectedColor.id === item.id ? 1 : "",
                        }}
                        onClick={() => {
                          setSelectedColor(item)
                        }}
                      />
                    )
                  })}
                </div>

                <h2>{t("Storage")}</h2>
                <div className="product-storages">
                  {PRODUCT_STORAGES.map((item: ProductStorageParam, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedStorage(item)
                        }}
                        style={{
                          background: selectedStorage.id === item.id ? "#28BC83" : "",
                          border: selectedStorage.id === item.id ? "#28BC83" : "",
                        }}
                      >
                        <p
                          style={{
                            color: selectedStorage.id === item.id ? "white" : "",
                          }}
                        >{`${item.value} GB`}</p>
                      </div>
                    )
                  })}
                </div>

                <h2>{t("Product Condition")}</h2>
                <div className="product-conditions">
                  {PRODUCT_CONDITIONS.map((item: ProductConditionParam, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          opacity: item.availability ? 1 : 0.3,
                          cursor: item.availability ? "pointer" : "",
                        }}
                        onClick={() => {
                          if (item.availability) setSelectedCondition(item)
                        }}
                      >
                        <div
                          className="condition-header"
                          style={{ background: selectedCondition.id === item.id ? "#28bc83" : "" }}
                        >
                          <p style={{ color: selectedCondition.id === item.id ? "white" : "" }}>
                            {t(item.name).toUpperCase()}
                          </p>
                        </div>
                        <div className="condition-body">
                          <p
                            style={{ color: selectedCondition.id === item.id ? "#28bc83" : "" }}
                          >{`$${item.cost}`}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="product-description">
                  <p>
                    {t(
                      "Very minor scratches on the body. For smartphones and tablets: the screen is completely intact and without scratches."
                    )}
                  </p>
                </div>

                <h2>{t("Add Ons")}</h2>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={deviceKit}
                          onChange={(e) => {
                            setDeviceKit(e.target.checked)
                          }}
                          name="deviceKit"
                          color="primary"
                        />
                      }
                      label={t("DeviceKit")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={screenProtector}
                          onChange={(e) => {
                            setScreenProtector(e.target.checked)
                          }}
                          name="screenProtector"
                          color="primary"
                        />
                      }
                      label={t("Screen Protector")}
                    />
                  </FormGroup>
                </FormControl>

                <div className="product-warranty" ref={refOption}>
                  <div
                    className="product-warranty-select"
                    onClick={() => {
                      setShowSelectWarranty(!showSelectWarranty)
                    }}
                  >
                    <div className="select-warranty-label">
                      <p>{t(selectedWarranty.label)}</p>
                    </div>
                    <div className="select-warranty-icon">
                      <img src="/img/icons/filled-arrow-down.svg" alt="filled-arrow-down" />
                    </div>
                  </div>
                  {showSelectWarranty && (
                    <div className="product-warranty-options">
                      {PRODUCT_WARRANTY_OPTIONS.map((item: ProductSelectParam, index: number) => {
                        return (
                          <p
                            key={index}
                            onClick={() => {
                              setSelectedWarranty(item)
                              setShowSelectWarranty(false)
                            }}
                          >
                            {t(item.label)}
                          </p>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="product-short-description">
                  <p>
                    <span>
                      <img src="/img/icons/ticket.svg" alt="ticket" />
                    </span>
                    {t("Fast Delivery")}
                  </p>
                  <p>
                    <span>
                      <img src="/img/icons/ticket.svg" alt="ticket" />
                    </span>
                    {t("Month Warranty")}
                  </p>
                  <p>
                    <span>
                      <img src="/img/icons/ticket.svg" alt="ticket" />
                    </span>
                    {t("Trade Ins Accepted")}
                  </p>
                </div>

                <p className="product-read-more">{t("Read More")}</p>
              </div>
            </div>

            <div className="similar-products">
              <h2>{t("SIMILAR PRODUCTS")}</h2>
              <div className="similar-products-container">
                {SIMILAR_PRODUCTS.map((item: ProductParam, index: number) => {
                  return (
                    <div key={index}>
                      <div className="similar-product-image">
                        <img src={item.img_src} alt={item.img_alt} />
                      </div>
                      <div className="similar-product-description">
                        <div className="flex align-center justify-between">
                          <h2>{item.name}</h2>
                          <h2>{`${item.storage} GB`}</h2>
                        </div>
                        <div>
                          <span>
                            <div style={{ background: "#3E4A44" }} />
                          </span>
                          {item.color}
                        </div>
                        <div>
                          <span>
                            {item.available_in_store ? (
                              <CheckOutlinedIcon style={{ color: "#54BA71" }} />
                            ) : (
                              <BlockOutlinedIcon />
                            )}
                          </span>
                          {item.available_in_store
                            ? t("Available in Store")
                            : t("Not available in Store")}
                        </div>
                        <div>
                          <span>
                            {item.available_online ? (
                              <CheckOutlinedIcon style={{ color: "#54BA71" }} />
                            ) : (
                              <BlockOutlinedIcon />
                            )}
                          </span>
                          {item.available_online
                            ? t("Available Online")
                            : t("Not available Online")}
                        </div>
                        <p
                          style={{ color: "#4360fa", marginTop: "10px", fontSize: "18px" }}
                        >{`$${item.cost}`}</p>
                        {/* <p>{`${t("As low as")}: ${item.short_description}`}</p> */}
                        <p>{`${t("Warranty")}: ${formatWarranty(
                          item.included_warranty_duration_month,
                          "MONTH"
                        )}`}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="quality-grading">
              <div className="quality-grading-header">
                <h2>{t("QUALITY GRADING")}</h2>
                <div>
                  {QUALITY_GRADINGS.map((item: QualityGradingParam, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{
                          border: item.id === selectedGrading.id ? "3px solid #4360fa" : "",
                        }}
                        onClick={() => {
                          setSelectedGrading(item)
                        }}
                      >
                        <h3>{t(item.name)}</h3>
                        <p>{t(item.abstract)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="quality-grading-body">
                <div className="quality-grading-description">
                  <h3>{t(selectedGrading.name)}</h3>
                  <p>{t(selectedGrading.description)}</p>
                  <div>
                    {selectedGrading.data.map((item: QualityGradingDataParam, index: number) => (
                      <div key={index}>
                        <img src={item.img_src} alt={item.name} />
                        <p>{t(item.name)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="quality-grading-preview">
                  {gradingPreview === GRADING_PREVIEW.front ? (
                    <img
                      src={selectedGrading.preview.front}
                      alt={`${selectedGrading.name}-front`}
                    />
                  ) : (
                    <img src={selectedGrading.preview.back} alt={`${selectedGrading.name}-back`} />
                  )}
                  <div>
                    <button
                      style={{
                        background: gradingPreview === GRADING_PREVIEW.front ? "#4360FA" : "",
                        color: gradingPreview === GRADING_PREVIEW.front ? "white" : "",
                      }}
                      onClick={() => {
                        setGradingPreview(GRADING_PREVIEW.front)
                      }}
                    >
                      {t("front")}
                    </button>
                    <button
                      style={{
                        background: gradingPreview === GRADING_PREVIEW.back ? "#4360FA" : "",
                        color: gradingPreview === GRADING_PREVIEW.back ? "white" : "",
                      }}
                      onClick={() => {
                        setGradingPreview(GRADING_PREVIEW.back)
                      }}
                    >
                      {t("back")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="quality-grading-footer">
                <img src="/img/product/quality-grading/device-kit.png" alt="device-kit" />
                <p>
                  {t(
                    "We offer a DeviceKit add on for all our devices, this includes a compatible charger & sim extractor."
                  )}
                </p>
              </div>
            </div>

            <div className="product-faqs">
              <div className="product-faqs-header">
                <h2>FAQ</h2>
              </div>

              <div className="product-faqs-body">
                {PRODUCT_FAQS.map((item: ProductFaqParam, index: number) => {
                  return (
                    <div key={index}>
                      <h3>{t(item.question)}</h3>
                      {item.answers.map((it: ProductFaqAnswerParam, idx: number) => (
                        <p key={`${index}-${idx}`}>
                          {t(it.text)}
                          {it.link && (
                            <span>
                              <a href={it.link.href}>{t(it.link.text)}</a>
                            </span>
                          )}
                        </p>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="product-towards-certified-desktop">
            <ProductTowardsCertified
              product={product}
              deviceKit={deviceKit}
              screenProtector={screenProtector}
              selectedWarranty={selectedWarranty}
            />
          </div>

          <div
            className="product-towards-drawer-switcher"
            onClick={() => {
              setTowardsDrawer(true)
            }}
          >
            <LeftArrow color="#BDBFC3" />
          </div>
        </div>
      </div>

      <ProductTowardsDrawer setOpen={setTowardsDrawer} open={towardsDrawer}>
        <ProductTowardsCertified
          product={product}
          deviceKit={deviceKit}
          screenProtector={screenProtector}
          selectedWarranty={selectedWarranty}
        />
      </ProductTowardsDrawer>
    </div>
  )
}

export default Section1
