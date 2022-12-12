import React from "react"
import { useTranslation } from "react-i18next"
import router from "next/router"

const EmptyCheckout = () => {
  const [t] = useTranslation()

  return (
    <div className="empty-checkout-page">
      <img src="/img/checkout/empty-cart.png" alt="empty-checkout" />
      <p>{t("You have no products in your cart!")}</p>
      <button
        onClick={() => {
          router.push("/shop")
        }}
      >
        {t("Shop")}
      </button>
    </div>
  )
}

export default EmptyCheckout
