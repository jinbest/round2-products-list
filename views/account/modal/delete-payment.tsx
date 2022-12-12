import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import { useTranslation } from "react-i18next"
import CloseIcon from "@material-ui/icons/Close"
import { IconButton } from "@material-ui/core"
import { observer } from "mobx-react"
import { authStore } from "../../../store"
import Loading from "../../../components/Loading"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import _ from "lodash"
import { PaymentParam } from "../../../models/account-param"
import { PaymentOptions } from "../../../static/mock/mock-data"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  paymentIndex: number
  paymentData: PaymentParam
}

const DeletePayment = ({ open, setOpen, paymentIndex, paymentData }: Props) => {
  const [t] = useTranslation()
  const delayTime = 2000

  const [deleted, setDeleted] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setDeleted(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    const cntAccountData = _.cloneDeep(authStore.accountData)
    setTimeout(() => {
      cntAccountData.paymentMethods.payments.splice(paymentIndex, 1)
      authStore.setAccountData(cntAccountData)
      setDeleted(true)
      setIsDeleting(false)
    }, delayTime)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="my-account-modal"
    >
      <div className="my-account-modal-container">
        <IconButton className="icon-button" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {deleted && <CheckCircleIcon style={{ color: "#A0E744", width: "90px", height: "90px" }} />}
        {!deleted ? (
          <h1>{t("Delete Payment Method")}</h1>
        ) : (
          <h1 style={{ margin: "15px 0 20px" }}>{t("Success!")}</h1>
        )}

        {!deleted ? (
          <>
            <p className="account-modal-content" style={{ margin: "25px 0" }}>
              {t("Are you sure you want to delete the following payment method?")}
            </p>
            {paymentData.type === PaymentOptions.credit && (
              <>
                <p className="account-modal-content">{`${t(
                  "Mastercard ending in"
                )} ${paymentData.cardInfo.number.slice(
                  paymentData.cardInfo.number.length - 4
                )}`}</p>
                <p className="account-modal-content">
                  {`${authStore.mockCredential.first_name} ${authStore.mockCredential.last_name}`}
                </p>
                <p
                  className="account-modal-content"
                  style={{ marginBottom: "20px" }}
                >{`EXP: ${paymentData.cardInfo.expiryDate}`}</p>
              </>
            )}
          </>
        ) : (
          <>
            <p className="account-modal-content" style={{ margin: "20px 0" }}>
              {t("The following payment method has been deleted from your account")}:
            </p>
            {paymentData.type === PaymentOptions.credit && (
              <>
                <p className="account-modal-content">{`${t(
                  "Mastercard ending in"
                )} ${paymentData.cardInfo.number.slice(
                  paymentData.cardInfo.number.length - 4
                )}`}</p>
                <p className="account-modal-content">
                  {`${authStore.mockCredential.first_name} ${authStore.mockCredential.last_name}`}
                </p>
                <p className="account-modal-content">{`EXP: ${paymentData.cardInfo.expiryDate}`}</p>
              </>
            )}
          </>
        )}

        {!deleted && (
          <div className="flex flex-wrap justify-center">
            <button className="filled-modal-button" onClick={handleDelete}>
              {isDeleting ? (
                <span>
                  <Loading />
                </span>
              ) : (
                t("Yes, Delete")
              )}
            </button>
            <button className="outline-modal-button" onClick={handleClose}>
              {t("No, Don't Delete")}
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default observer(DeletePayment)
