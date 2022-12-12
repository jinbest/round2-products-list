import React, { useState } from "react"
import { observer } from "mobx-react"
import { shopStore } from "../../../store"
import { useTranslation } from "react-i18next"
import { MyOrdersParam } from "../../../models/account-param"
import moment from "moment-timezone"
import _, { isEmpty } from "lodash"
import CancelOrder from "../modal/cancel-order"
import UpArrow from "../../../components/svg/up-arrow"
import DownArrow from "../../../components/svg/down-arrow"
import { ORDER_STATUS_DATA } from "../../../const/_variables"

const MyOrders = () => {
  const [t] = useTranslation()

  const [cancelModal, setCancelModal] = useState(false)
  const [cancelIndex, setCancelIndex] = useState(-1)
  const [cancelOrderData, setCancelOrderData] = useState<MyOrdersParam>({} as MyOrdersParam)
  const [expand, setExpand] = useState(-1)

  const _getFilledButtonClassName_ = (val: string) => {
    if (val === ORDER_STATUS_DATA.in_transit || val === ORDER_STATUS_DATA.delivered) {
      return "my-order-filled-button"
    } else {
      return "my-order-filled-button order-filled-disable"
    }
  }

  const _getOutlinedButtonClassName_ = (val: string) => {
    if (val === ORDER_STATUS_DATA.in_transit || val === ORDER_STATUS_DATA.delivered) {
      return "my-order-outline-button"
    } else {
      return "my-order-outline-button order-outline-disable"
    }
  }

  const _getDisabledStatus = (val: string) => {
    if (val === ORDER_STATUS_DATA.in_transit || val === ORDER_STATUS_DATA.delivered) {
      return false
    } else {
      return true
    }
  }

  const handleCancel = (item: MyOrdersParam, index: number) => {
    const cntOrderedData = _.cloneDeep(shopStore.orderedData)
    if (cntOrderedData.length > index) {
      if (item.status === ORDER_STATUS_DATA.delivered) {
        cntOrderedData[index].status = ORDER_STATUS_DATA.returned
        shopStore.setOrderedData(cntOrderedData)
      } else if (item.status === ORDER_STATUS_DATA.in_transit) {
        setCancelIndex(index)
        setCancelOrderData(item)
        setCancelModal(true)
      }
    }
  }

  const handleOrder = (item: MyOrdersParam, type: string) => {
    const cntOrderedData = _.cloneDeep(shopStore.orderedData)
    const orderIndex = _.findIndex(cntOrderedData, { order: item.order })
    if (orderIndex > -1) {
      cntOrderedData[orderIndex].status = type
      shopStore.setOrderedData(cntOrderedData)
    }
  }

  return (
    <div className="account-details">
      <p className="details-title">{t("My Orders")}</p>
      {shopStore.orderedData.length ? (
        <div className="account-details-viewer" style={{ maxWidth: "100%", paddingRight: "10px" }}>
          {shopStore.orderedData.map((item: MyOrdersParam, index: number) => {
            return (
              <div className="my-orders-row-data" key={index}>
                <div
                  onClick={() => {
                    if (expand === index) {
                      setExpand(-1)
                    } else {
                      setExpand(index)
                    }
                  }}
                >
                  <div className="order-date">
                    <p className="order-title">{t("Order Date")}</p>
                    <p className="order-content">{moment(item.date).format("MM/DD/YYYY")}</p>
                  </div>
                  <div className="order-no">
                    <p className="order-title">{t("Order No.")}</p>
                    <p className="order-content">{item.order}</p>
                  </div>
                  <div className="order-status">
                    <p className="order-title">{t("Order Status")}</p>
                    <p className="order-content">{item.status}</p>
                  </div>
                  <div className="order-arrow">
                    {expand === index ? <UpArrow color="black" /> : <DownArrow color="black" />}
                  </div>
                  <div className="order-items">
                    <p className="order-title">{t("Items")}</p>
                    <p className="order-content">{item.data.name}</p>
                    <p className="order-content">{`${item.data.storage} | ${item.data.color}`}</p>
                  </div>
                  <div className="order-buttons">
                    <button
                      className={_getFilledButtonClassName_(item.status)}
                      disabled={_getDisabledStatus(item.status)}
                      onClick={() => {
                        handleOrder(item, ORDER_STATUS_DATA.in_transit)
                      }}
                    >
                      {t("Track Parcel")}
                    </button>
                    <button
                      className={_getOutlinedButtonClassName_(item.status)}
                      disabled={_getDisabledStatus(item.status)}
                      onClick={() => {
                        handleCancel(item, index)
                      }}
                    >
                      {item.status === ORDER_STATUS_DATA.in_transit
                        ? t("Cancel Order")
                        : t("Return")}
                    </button>
                  </div>
                </div>
                {expand === index && (
                  <div className="mobile-orders-row">
                    <div className="order-items-mobile">
                      <p className="order-title">{t("Items")}</p>
                      <p className="order-content">{`${item.data.name} | ${item.data.storage} | ${item.data.color}`}</p>
                    </div>
                    <div className="order-buttons-mobile">
                      <button
                        className={_getFilledButtonClassName_(item.status)}
                        disabled={_getDisabledStatus(item.status)}
                        onClick={() => {
                          handleOrder(item, ORDER_STATUS_DATA.in_transit)
                        }}
                      >
                        {t("Track Parcel")}
                      </button>
                      <button
                        className={_getOutlinedButtonClassName_(item.status)}
                        disabled={_getDisabledStatus(item.status)}
                        onClick={() => {
                          handleCancel(item, index)
                        }}
                      >
                        {item.status === ORDER_STATUS_DATA.in_transit
                          ? t("Cancel Order")
                          : t("Return")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <></>
      )}
      {cancelIndex > -1 && !isEmpty(cancelOrderData) && (
        <CancelOrder
          open={cancelModal}
          setOpen={setCancelModal}
          orderIndex={cancelIndex}
          orderData={cancelOrderData}
        />
      )}
    </div>
  )
}

export default observer(MyOrders)
