import React, { useState, useRef } from "react"
import { observer } from "mobx-react"
import { authStore } from "../../../store"
import { useTranslation } from "react-i18next"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import { isEmpty } from "lodash"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"
import Toast from "../../../components/toast/toast"
import { PaymentParam, ImageDataParam } from "../../../models/account-param"
import { PaymentOptionParam } from "../../../models/checkout-params"
import PaymentCreditForm from "./payment-credit-form"
import DeletePayment from "../modal/delete-payment"
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core"
import { PaymentOptions, PaymentLogos } from "../../../static/mock/mock-data"

const PaymentMethods = () => {
  const [t] = useTranslation()
  const formikRef = useRef<any>()

  const [addStatus, setAddStatus] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [deleteIndex, setDeleteIndex] = useState(-1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deletePayment, setDeletePayment] = useState<PaymentParam>({} as PaymentParam)
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [paymentOption, setPaymentOption] = useState(PaymentOptions.credit)

  const handlePaymentOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentOption((event.target as HTMLInputElement).value as PaymentOptionParam)
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

  return (
    <div className="account-details">
      <p className="details-title">{t(authStore.accountData.paymentMethods.title)}</p>
      {!addStatus && editIndex < 0 && (
        <button
          className="icon-button"
          onClick={() => {
            setEditIndex(-1)
            setAddStatus(true)
          }}
        >
          <span>
            <img src="/img/icons/plus.png" alt="plus" />
          </span>
        </button>
      )}
      <div className="account-details-viewer" style={{ overflow: addStatus ? "visible" : "" }}>
        {!addStatus ? (
          <>
            {authStore.accountData.paymentMethods.payments.map(
              (item: PaymentParam, index: number) => {
                return (
                  <div key={index} className="account-address">
                    <div className="account-address-header">
                      <div className="flex">
                        <p>{t(item.name)}</p>
                        <div className="payment-logos">
                          {item.logos.map((it: ImageDataParam, idx: number) => (
                            <img src={it.img_src} alt={it.alt} key={`${index}-${idx}`} />
                          ))}
                        </div>
                      </div>
                      {index !== editIndex && (
                        <div
                          onClick={() => {
                            if (item.type === PaymentOptions.credit) {
                              setEditIndex(index)
                            }
                          }}
                        >
                          <EditOutlinedIcon style={{ color: "#CBBBFA" }} />
                        </div>
                      )}
                    </div>
                    {editIndex !== index && (
                      <div className="account-address-content">
                        {item.type === PaymentOptions.paypal && (
                          <p>{authStore.mockCredential.email}</p>
                        )}
                        {item.type === PaymentOptions.credit && (
                          <p>{`${t("Mastercard ending in")} ${item.cardInfo.number.slice(
                            item.cardInfo.number.length - 4
                          )}`}</p>
                        )}
                        {item.type === PaymentOptions.credit && (
                          <p>{`${authStore.mockCredential.first_name} ${authStore.mockCredential.last_name}`}</p>
                        )}
                        {item.type === PaymentOptions.credit && <p>{item.cardInfo.expiryDate}</p>}
                        {index === 0 && (
                          <p className="small-text" style={{ padding: "10px 0", color: "#505050" }}>
                            {t(
                              "you'll need to enter your login details when you place your order."
                            )}
                          </p>
                        )}
                        {index === 0 && (
                          <p style={{ color: "#b5b5b5" }}>
                            {t("This is your default payment method")}
                          </p>
                        )}
                      </div>
                    )}
                    {index !== editIndex && (
                      <button
                        className="delete-address"
                        onClick={() => {
                          setDeletePayment(item)
                          setDeleteIndex(index)
                          setDeleteModal(true)
                        }}
                      >
                        {t("Delete address")}
                      </button>
                    )}
                    {index === editIndex && item.type === PaymentOptions.credit && (
                      <PaymentCreditForm
                        ref={formikRef}
                        editIndex={editIndex}
                        addStatus={addStatus}
                        setEditIndex={setEditIndex}
                        setAddStatus={setAddStatus}
                        setToastParams={setToastParams}
                      />
                    )}
                  </div>
                )
              }
            )}
          </>
        ) : (
          <div className="account-address">
            <div className="account-address-header">
              <p>{t("New Payment Method")}</p>
            </div>
            <RadioGroup
              aria-label="paymentOption"
              name="payment-options"
              value={paymentOption}
              onChange={handlePaymentOptionChange}
              style={{ marginLeft: "-10px" }}
            >
              <FormControlLabel
                value={PaymentOptions.credit}
                control={<Radio />}
                label={
                  <span className="radio-span">
                    <p>{t("Credit or Debit Card")}</p>
                    <div className="payment-logos">
                      {PaymentLogos.credit.map((item: ImageDataParam, index: number) => (
                        <img src={item.img_src} alt={item.alt} key={index} />
                      ))}
                    </div>
                  </span>
                }
              />
              {paymentOption === PaymentOptions.credit && (
                <div style={{ marginLeft: "5px", width: "100%" }}>
                  <div className="horizontal-liner" />
                  <PaymentCreditForm
                    ref={formikRef}
                    editIndex={editIndex}
                    addStatus={addStatus}
                    setEditIndex={setEditIndex}
                    setAddStatus={setAddStatus}
                    setToastParams={setToastParams}
                  />
                </div>
              )}
              <FormControlLabel
                value={PaymentOptions.paypal}
                control={<Radio />}
                label={
                  <span className="radio-span">
                    <p>{t("Paypal")}</p>
                    <div className="payment-logos">
                      {PaymentLogos.paypal.map((item: ImageDataParam, index: number) => (
                        <img src={item.img_src} alt={item.alt} key={index} />
                      ))}
                    </div>
                  </span>
                }
              />
              {paymentOption === PaymentOptions.paypal && (
                <div style={{ marginLeft: "5px", width: "100%" }}>
                  <div className="horizontal-liner" />
                  <div className="connect-paypal">
                    <img src="/img/payments/connect-paypal.png" alt="connect-paypal" />
                  </div>
                </div>
              )}
            </RadioGroup>
          </div>
        )}
      </div>
      {deleteIndex >= 0 && !isEmpty(deletePayment) && (
        <DeletePayment
          open={deleteModal}
          setOpen={setDeleteModal}
          paymentIndex={deleteIndex}
          paymentData={deletePayment}
        />
      )}
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default observer(PaymentMethods)
