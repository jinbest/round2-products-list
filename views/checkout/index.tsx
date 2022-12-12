import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import { shopStore, authStore } from "../../store"
import EmptyCheckout from "./compo/empty-checkout"
import ProgressBar from "./compo/progress-bar"
import { CheckoutProgressStatusParam } from "../../models/checkout-params"
import {
  CHECKOUT_PROGRESS_STATUS,
  SHIPPING_STEP_STATUS,
  PAYMENT_STEP_STATUS,
  PAYMENT_OPTIONS,
  ORDER_STATUS_DATA,
} from "../../const/_variables"
import _ from "lodash"
import { ShopCartParam } from "../../models/shop-cart"
import Toast from "../../components/toast/toast"
import { ToastMsgParams } from "../../components/toast/toast-msg-params"
import SignModal from "../../components/sign-modal/sign-modal"
import BackSVG from "../../components/svg/back-svg"
import CheckoutComponent from "./compo/checkout-component"
import CheckoutConfirmAddress from "./compo/checkout-confirm-address"
import ProgressCart from "./compo/progress-cart"
import ProgressShipping from "./compo/progress-shipping"
import ProgressPayment from "./compo/progress-payment"
import { useTranslation } from "react-i18next"
import moment from "moment"

const Checkout = () => {
  const [t] = useTranslation()

  const [progressStatus, setProgressStatus] = useState<CheckoutProgressStatusParam>(
    CHECKOUT_PROGRESS_STATUS.cart
  )
  const [proVal, setProVal] = useState(10)
  const [shopCarts, setShopCarts] = useState<ShopCartParam[]>(_.cloneDeep(shopStore.shopCarts))
  const [emptyCheckout, setEmptyCheckout] = useState(shopStore.shopCarts.length === 0)
  const [totalCost, setTotalCost] = useState(0)
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [openSignModal, setOpenSignModal] = useState(false)
  const [shippingStepStatus, setShippingStepStatus] = useState(SHIPPING_STEP_STATUS.order_address)
  const [paymentStepStatus, setPaymentStepStatus] = useState(PAYMENT_STEP_STATUS.confirm_and_pay)
  const [tradeIn, setTradeIn] = useState(false)
  const [paymentToken, setPaymentToken] = useState("")

  useEffect(() => {
    setShopCarts(_.cloneDeep(shopStore.shopCarts))
  }, [shopStore.shopCarts])

  useEffect(() => {
    setEmptyCheckout(shopCarts.length === 0)

    let cost = 0
    shopCarts.forEach((item: ShopCartParam) => {
      cost += item.cost * item.total
      if (item.device_kit && item.device_kit_cost) {
        cost += item.device_kit_cost * item.total
      }
      if (item.screen_protector && item.screen_protector_cost) {
        cost += item.screen_protector_cost * item.total
      }
      if (item.cost_include_warranty && item.warranty_cost) {
        cost += item.warranty_cost * item.total
      }
    })
    setTotalCost(cost)
  }, [shopCarts])

  useEffect(() => {
    if (progressStatus === CHECKOUT_PROGRESS_STATUS.cart) {
      setProVal(10)
    } else if (progressStatus === CHECKOUT_PROGRESS_STATUS.account) {
      setProVal(37)
    } else if (progressStatus === CHECKOUT_PROGRESS_STATUS.shipping) {
      setProVal(60)
    } else if (progressStatus === CHECKOUT_PROGRESS_STATUS.payment) {
      setProVal(82)
    } else {
      setProVal(100)
    }
  }, [progressStatus])

  useEffect(() => {
    setProgressStatus(shopStore.progressStatus)
  }, [shopStore.progressStatus])

  const handleCheckout = () => {
    shopStore.setShopCarts(shopCarts)
    if (authStore.authUser) {
      shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.shipping)
    } else {
      shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.account)
      authStore.setProgressForCheckout(true)
      setOpenSignModal(true)
    }
  }

  const resetStatuses = () => {
    setToastParams({
      msg: "",
      isError: false,
      isWarning: false,
      isInfo: false,
      isSuccess: false,
    })
  }

  const _back_button_visible_ = () => {
    return (
      progressStatus !== CHECKOUT_PROGRESS_STATUS.cart &&
      progressStatus !== CHECKOUT_PROGRESS_STATUS.confirmation
    )
  }

  const handleBack = () => {
    if (progressStatus === CHECKOUT_PROGRESS_STATUS.account) {
      shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.cart)
    } else if (progressStatus === CHECKOUT_PROGRESS_STATUS.shipping) {
      if (shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
        shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.account)
      } else if (shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) {
        setShippingStepStatus(SHIPPING_STEP_STATUS.order_address)
      } else if (shippingStepStatus === SHIPPING_STEP_STATUS.confirm_order_address) {
        setShippingStepStatus(SHIPPING_STEP_STATUS.billing_address)
      } else if (shippingStepStatus === SHIPPING_STEP_STATUS.confirm_billing_address) {
        setShippingStepStatus(SHIPPING_STEP_STATUS.confirm_order_address)
      } else if (shippingStepStatus === SHIPPING_STEP_STATUS.delivery_options) {
        setShippingStepStatus(SHIPPING_STEP_STATUS.confirm_billing_address)
      }
    } else if (progressStatus === CHECKOUT_PROGRESS_STATUS.payment) {
      if (paymentStepStatus === PAYMENT_STEP_STATUS.confirm_and_pay) {
        shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.shipping)
        setShippingStepStatus(SHIPPING_STEP_STATUS.delivery_options)
      } else if (paymentStepStatus === PAYMENT_STEP_STATUS.review_order) {
        setPaymentStepStatus(PAYMENT_STEP_STATUS.confirm_and_pay)
      }
    }
  }

  const handlePlaceOrder = () => {
    _trade_in_()
    const cntOrderedData = _.cloneDeep(shopStore.orderedData)

    const orderList = cntOrderedData.map((a) => a.order)
    let newOrder = 0
    if (!orderList.length) {
      newOrder = 1
    } else {
      newOrder = Math.max(...orderList) + 1
    }

    shopStore.shopCarts.forEach((item: ShopCartParam) => {
      let cost = item.cost * item.total
      if (item.device_kit && item.device_kit_cost) {
        cost += item.device_kit_cost * item.total
      }
      if (item.screen_protector && item.screen_protector_cost) {
        cost += item.screen_protector_cost * item.total
      }
      if (item.cost_include_warranty && item.warranty_cost) {
        cost += item.warranty_cost * item.total
      }
      cntOrderedData.push({
        date: moment().format("YYYY-MM-DD"),
        order: newOrder,
        status: ORDER_STATUS_DATA.delivered,
        paymentToken: paymentToken,
        cost: cost,
        data: item,
      })
      newOrder += 1
    })

    shopStore.setOrderedData(cntOrderedData)
    shopStore.setShopCarts([])
    shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.confirmation)
  }

  const _trade_in_ = () => {
    // here will be functionality to check if it's trade-in or not later.
    setTradeIn(false)
  }

  return (
    <div className="checkout">
      <div className="container">
        <ProgressBar value={proVal} />

        {_back_button_visible_() && (
          <div className="back-to-top" onClick={handleBack}>
            <BackSVG color="#BDBFC3" />
          </div>
        )}
        {emptyCheckout && progressStatus !== CHECKOUT_PROGRESS_STATUS.confirmation ? (
          <EmptyCheckout />
        ) : (
          <div className="checkout-main-container">
            {paymentStepStatus !== PAYMENT_STEP_STATUS.review_order &&
              progressStatus !== CHECKOUT_PROGRESS_STATUS.confirmation && (
                <div className="left-side">
                  {(progressStatus === CHECKOUT_PROGRESS_STATUS.cart ||
                    progressStatus === CHECKOUT_PROGRESS_STATUS.account) && (
                    <ProgressCart shopCarts={shopCarts} setShopCarts={setShopCarts} />
                  )}

                  {progressStatus === CHECKOUT_PROGRESS_STATUS.shipping && (
                    <ProgressShipping
                      shippingStepStatus={shippingStepStatus}
                      setShippingStepStatus={setShippingStepStatus}
                    />
                  )}

                  {progressStatus === CHECKOUT_PROGRESS_STATUS.payment &&
                    paymentStepStatus === PAYMENT_STEP_STATUS.confirm_and_pay && (
                      <ProgressPayment
                        setPaymentStepStatus={setPaymentStepStatus}
                        setPaymentToken={setPaymentToken}
                      />
                    )}
                </div>
              )}

            {paymentStepStatus !== PAYMENT_STEP_STATUS.review_order &&
              progressStatus !== CHECKOUT_PROGRESS_STATUS.confirmation && (
                <div className="right-side">
                  <CheckoutComponent
                    shopCarts={shopCarts}
                    handleCheckout={handleCheckout}
                    progressStatus={progressStatus}
                    totalCost={totalCost}
                  />

                  {(progressStatus === CHECKOUT_PROGRESS_STATUS.payment ||
                    (progressStatus === CHECKOUT_PROGRESS_STATUS.shipping &&
                      shippingStepStatus === SHIPPING_STEP_STATUS.delivery_options)) && (
                    <CheckoutConfirmAddress setShippingStepStatus={setShippingStepStatus} />
                  )}
                </div>
              )}

            {progressStatus === CHECKOUT_PROGRESS_STATUS.payment &&
              paymentStepStatus === PAYMENT_STEP_STATUS.review_order && (
                <div className="right-side" style={{ margin: "auto" }}>
                  <CheckoutConfirmAddress setShippingStepStatus={setShippingStepStatus} review />

                  <CheckoutComponent
                    shopCarts={shopCarts}
                    handleCheckout={handleCheckout}
                    progressStatus={progressStatus}
                    totalCost={totalCost}
                  />

                  <div className="review-payment-method box-cart">
                    <h2>{t("Payment Method")}</h2>
                    <div>
                      <p style={{ marginRight: "15px" }}>
                        {shopStore.paymentMethod === PAYMENT_OPTIONS.credit_debit.code
                          ? t("Credit")
                          : t("Paypal")}
                        :
                      </p>
                      <p>
                        {shopStore.paymentMethod === PAYMENT_OPTIONS.credit_debit.code
                          ? shopStore.creditCardInfo.number
                          : "member@devicelist.ca"}
                      </p>
                    </div>
                  </div>

                  <button className="place-order" onClick={handlePlaceOrder}>
                    {t("Place Order")}
                  </button>
                </div>
              )}

            {progressStatus === CHECKOUT_PROGRESS_STATUS.confirmation && (
              <div className="checkout-confirmation">
                {tradeIn ? (
                  <img src="/img/checkout/trade-in.png" alt="checkout-trade-in" />
                ) : (
                  <img src="/img/checkout/shopping.png" alt="checkout-shopping" />
                )}
                <p style={{ color: "#4360FA", padding: "20px 0" }}>
                  {tradeIn
                    ? t("Trade-In Request Complete!")
                    : t("Thank you for shopping with DeviceList!")}
                </p>
                <p>
                  {tradeIn
                    ? t("You will receieve an email with details about your trade-in.")
                    : t("Your order has been placed!")}
                </p>
                {tradeIn ? (
                  <p>
                    {t("You can also track your trade-in approval")}
                    <span>
                      <a href="#">{t("here")}</a>
                    </span>
                  </p>
                ) : (
                  <p>{t("Keep an eye out for an email with your tracking information.")}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <SignModal open={openSignModal} setOpen={setOpenSignModal} setToastParams={setToastParams} />
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default observer(Checkout)
