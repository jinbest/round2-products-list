import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import { useTranslation } from "react-i18next"
import CloseIcon from "@material-ui/icons/Close"
import { IconButton } from "@material-ui/core"
import { observer } from "mobx-react"
import { shopStore } from "../../../store"
import Loading from "../../../components/Loading"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import _ from "lodash"
import { MyOrdersParam } from "../../../models/account-param"
import moment from "moment-timezone"
import { formatWarranty } from "../../../service/hepler"
import { ORDER_STATUS_DATA } from "../../../const/_variables"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  orderIndex: number
  orderData: MyOrdersParam
}

const CancelOrder = ({ open, setOpen, orderIndex, orderData }: Props) => {
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
    const cntOrderedData = _.cloneDeep(shopStore.orderedData)
    setTimeout(() => {
      cntOrderedData[orderIndex].status = ORDER_STATUS_DATA.cancelled
      shopStore.setOrderedData(cntOrderedData)
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
          <h1>{t("Are you sure you want to cancel your order?")}</h1>
        ) : (
          <h1 style={{ margin: "15px 0 20px" }}>{t("Success!")}</h1>
        )}

        {!deleted ? (
          <div className="flex align-center" style={{ margin: "30px 0" }}>
            <div className="cancel-modal-left-content">
              <div>
                <p className="mid-text bold">{t("Order Date")}</p>
                <p className="mid-text thin">{moment(orderData.date).format("MMM D, yyyy")}</p>
              </div>
              <div>
                <p className="mid-text bold">{t("Order No.")}</p>
                <p className="mid-text thin">{orderData.order}</p>
              </div>
              <div>
                <p className="mid-text bold">{t("Order Date")}</p>
                <p className="mid-text thin">{orderData.status}</p>
              </div>
            </div>
            <div style={{ padding: "0 20px" }}>
              <p className="mid-text bold">{t("Items in Order")}</p>
              <img src={orderData.data.img_src} alt="data-asset" />
            </div>
            <div>
              <p className="mid-text bold">{orderData.data.name}</p>
              <p className="mid-text thin">{`${orderData.data.storage} | ${orderData.data.color}`}</p>
              <p className="mid-text" style={{ color: "#4360FA" }}>{`$${orderData.data.cost}`}</p>
              {orderData.data.included_warranty_duration_month && (
                <p className="small-text" style={{ marginTop: "3px" }}>
                  {`${t("Warranty")}: ${formatWarranty(
                    orderData.data.included_warranty_duration_month,
                    "MONTH"
                  )}`}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <p className="account-modal-content" style={{ margin: "10px 0" }}>
              {`${t("Order No.")} ${orderData.order} ${t("has been cancelled.")}`}
            </p>
            <p className="account-modal-content" style={{ margin: "20px 0" }}>
              {t(
                "It may take several minutes for the order to disappear from the list on your order history page."
              )}
            </p>
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
                t("Yes, Delete Items")
              )}
            </button>
            <button className="outline-modal-button" onClick={handleClose}>
              {t("No, Don't Cancel")}
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default observer(CancelOrder)
