import React from "react"
import { ShopCartParam } from "../../../models/shop-cart"
import { formatAsMoney } from "../../../service/hepler"
import { useTranslation } from "react-i18next"
import { CheckoutProgressStatusParam } from "../../../models/checkout-params"
import { CHECKOUT_PROGRESS_STATUS } from "../../../const/_variables"

type Props = {
  shopCarts: ShopCartParam[]
  handleCheckout: () => void
  progressStatus: CheckoutProgressStatusParam
  totalCost: number
}

const CheckoutComponent = ({ shopCarts, handleCheckout, progressStatus, totalCost }: Props) => {
  const [t] = useTranslation()

  return (
    <div className="checkout-component box-cart">
      {shopCarts.map((item: ShopCartParam, index: number) => {
        return (
          <div key={index} className="product-profile">
            <div>
              <p className="bold">{item.name}</p>
              <p className="bold">{`${formatAsMoney(item.cost)} (x ${item.total})`}</p>
            </div>
            <div>
              <p>{item.description}</p>
            </div>
            {!item.locked && (
              <div>
                <p>{t("Unlocked")}</p>
              </div>
            )}
            {item.device_kit && item.device_kit_cost && (
              <div style={{ margin: "8px 0" }}>
                <p className="bold">{t("DeviceKit")}</p>
                <p className="bold">{formatAsMoney(item.device_kit_cost)}</p>
              </div>
            )}
            {item.screen_protector && (
              <div style={{ margin: "8px 0" }}>
                <p className="bold">{t("Screen Protector")}</p>
                <p className="bold">{formatAsMoney(item.screen_protector_cost)}</p>
              </div>
            )}
            {item.cost_include_warranty && (
              <div style={{ margin: "8px 0" }}>
                <p className="bold">{`${item.included_warranty_duration_month} ${t(
                  "Month Warranty"
                )}`}</p>
                <p className="bold">{formatAsMoney(item.warranty_cost)}</p>
              </div>
            )}
          </div>
        )
      })}

      <div
        className="flex justify-between align-center"
        style={{ borderBottom: "none", padding: "20px 0" }}
      >
        <p className="bold">{t("Subtotal")}</p>
        <p className="bold">{formatAsMoney(totalCost)}</p>
      </div>

      {(progressStatus === CHECKOUT_PROGRESS_STATUS.cart ||
        progressStatus === CHECKOUT_PROGRESS_STATUS.account) && (
        <div className="check-button" style={{ borderBottom: "none" }}>
          <button onClick={handleCheckout}>{t("Checkout")}</button>
        </div>
      )}
    </div>
  )
}

export default CheckoutComponent
