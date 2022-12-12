import React from "react"
import { formatCountryName, phoneFormatString } from "../../../service/hepler"
import EditIcon from "../../../components/svg/edit-svg"
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined"
import { observer } from "mobx-react"
import { shopStore } from "../../../store"
import { useTranslation } from "react-i18next"
import { CHECKOUT_PROGRESS_STATUS, SHIPPING_STEP_STATUS } from "../../../const/_variables"

type Props = {
  setShippingStepStatus: (val: string) => void
  review?: boolean
}

const CheckoutConfirmAddress = ({ setShippingStepStatus, review }: Props) => {
  const [t] = useTranslation()

  return (
    <div className="checkout-confirm-address box-cart">
      <div className="bottom-bordered">
        {review && <h2>{t("Review your order")}</h2>}
        {!review && (
          <div
            className="change-address-button"
            onClick={() => {
              shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.shipping)
              setShippingStepStatus(SHIPPING_STEP_STATUS.order_address)
            }}
          >
            <EditIcon />
          </div>
        )}
        <p className="bold">{`${t("Ship to")} ${shopStore.orderAddress.first_name} ${
          shopStore.orderAddress.last_name
        }`}</p>
        <p>{shopStore.orderAddress.address_1}</p>
        {shopStore.orderAddress.address_2 && <p>{shopStore.orderAddress.address_2}</p>}
        <p>{`${shopStore.orderAddress.postcode}, ${shopStore.orderAddress.city}, ${shopStore.orderAddress.state}`}</p>
        <p>{formatCountryName(shopStore.orderAddress.country)}</p>
        {shopStore.orderAddress.phone && (
          <p className="flex align-center">
            <span>
              <PhoneOutlinedIcon />
            </span>
            {phoneFormatString(shopStore.orderAddress.phone)}
          </p>
        )}
      </div>

      <div>
        {!review && (
          <div
            className="change-address-button"
            onClick={() => {
              shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.shipping)
              setShippingStepStatus(SHIPPING_STEP_STATUS.billing_address)
            }}
          >
            <EditIcon />
          </div>
        )}
        <p className="bold">{`${t("Bill to")} ${shopStore.billingAddress.first_name} ${
          shopStore.billingAddress.last_name
        }`}</p>
        <p>{shopStore.billingAddress.address_1}</p>
        {shopStore.billingAddress.address_2 && <p>{shopStore.billingAddress.address_2}</p>}
        <p>{`${shopStore.billingAddress.postcode}, ${shopStore.billingAddress.city}, ${shopStore.billingAddress.state}`}</p>
        <p>{formatCountryName(shopStore.billingAddress.country)}</p>
        {shopStore.billingAddress.phone && (
          <p className="flex align-center">
            <span>
              <PhoneOutlinedIcon />
            </span>
            {phoneFormatString(shopStore.billingAddress.phone)}
          </p>
        )}
      </div>
    </div>
  )
}

export default observer(CheckoutConfirmAddress)
