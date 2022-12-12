import React from "react"
import { ShopCartParam } from "../../../models/shop-cart"
import { formatAsMoney } from "../../../service/hepler"
import { useTranslation } from "react-i18next"
import _ from "lodash"

type Props = {
  shopCarts: ShopCartParam[]
  setShopCarts: (val: ShopCartParam[]) => void
}

const ProgressCart = ({ shopCarts, setShopCarts }: Props) => {
  const [t] = useTranslation()

  return (
    <>
      {shopCarts.map((item: ShopCartParam, index: number) => {
        return (
          <div className="box-cart" key={index}>
            <div className="left-product-container">
              <div className="product-profile">
                <img src={item.img_src} alt={item.img_alt} />
                <div>
                  <div>
                    <p className="bold">{item.name}</p>
                    <p className="bold">{formatAsMoney(item.cost)}</p>
                  </div>
                  <div>
                    <p>{item.description}</p>
                  </div>
                  {!item.locked && (
                    <div>
                      <p>{t("Unlocked")}</p>
                    </div>
                  )}
                  <div style={{ margin: "5px 0" }}>
                    <p
                      className="shop-cart-remove-btn"
                      onClick={() => {
                        _.remove(shopCarts, (o) => o.id === item.id)
                        setShopCarts([...shopCarts])
                      }}
                    >
                      {t("Remove")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="add-ons">
                <h3>{t("Add Ons")}</h3>

                <div
                  style={{
                    border: item.device_kit ? "2px solid #4360FA" : "",
                  }}
                  onClick={() => {
                    if (item.device_kit) {
                      shopCarts[index].device_kit = false
                    } else {
                      shopCarts[index].device_kit = true
                    }
                    setShopCarts([...shopCarts])
                  }}
                >
                  <p>{t("DeviceKit")}</p>
                  <p>{formatAsMoney(item.device_kit_cost)}</p>
                </div>

                <div
                  style={{
                    border: item.screen_protector ? "2px solid #4360FA" : "",
                  }}
                  onClick={() => {
                    if (item.screen_protector) {
                      shopCarts[index].screen_protector = false
                    } else {
                      shopCarts[index].screen_protector = true
                    }
                    setShopCarts([...shopCarts])
                  }}
                >
                  <p>{t("Screen Protector")}</p>
                  <p>{formatAsMoney(item.screen_protector_cost)}</p>
                </div>

                <div
                  style={{
                    border: item.cost_include_warranty ? "2px solid #4360FA" : "",
                  }}
                  onClick={() => {
                    if (item.cost_include_warranty) {
                      shopCarts[index].cost_include_warranty = false
                    } else {
                      shopCarts[index].cost_include_warranty = true
                    }
                    setShopCarts([...shopCarts])
                  }}
                >
                  <p>{`${item.included_warranty_duration_month} ${t("Month Warranty")} (${t(
                    "included"
                  )})`}</p>
                  <p>{formatAsMoney(item.warranty_cost)}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ProgressCart
