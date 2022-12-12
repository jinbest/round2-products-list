import React, { useState } from "react"
import { observer } from "mobx-react"
import { shopStore } from "../../../store"
import { useTranslation } from "react-i18next"
import { MyOrdersParam } from "../../../models/account-param"
import moment from "moment-timezone"
import _ from "lodash"
import UpArrow from "../../../components/svg/up-arrow"
import DownArrow from "../../../components/svg/down-arrow"
import { ORDER_STATUS_DATA } from "../../../const/_variables"

const MyReturns = () => {
  const [t] = useTranslation()

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
      <p className="details-title">{t("My Returns")}</p>
      {_.filter(shopStore.orderedData, (o) => o.status === ORDER_STATUS_DATA.returned).length ? (
        <div className="account-details-viewer" style={{ maxWidth: "100%" }}>
          {_.filter(shopStore.orderedData, (o) => o.status === ORDER_STATUS_DATA.returned).map(
            (item: MyOrdersParam, index: number) => {
              return (
                <div key={index} className="my-orders-row-data">
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
                      <p className="order-content">{ORDER_STATUS_DATA.in_transit}</p>
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
                        className={_getFilledButtonClassName_(ORDER_STATUS_DATA.in_transit)}
                        onClick={() => {
                          handleOrder(item, ORDER_STATUS_DATA.in_transit)
                        }}
                      >
                        {t("Track Parcel")}
                      </button>
                      <button
                        className={_getOutlinedButtonClassName_(ORDER_STATUS_DATA.in_transit)}
                        onClick={() => {
                          handleOrder(item, ORDER_STATUS_DATA.delivered)
                        }}
                      >
                        {t("Order Again")}
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
                          className={_getFilledButtonClassName_(ORDER_STATUS_DATA.in_transit)}
                          onClick={() => {
                            handleOrder(item, ORDER_STATUS_DATA.in_transit)
                          }}
                        >
                          {t("Track Parcel")}
                        </button>
                        <button
                          className={_getOutlinedButtonClassName_(ORDER_STATUS_DATA.in_transit)}
                          onClick={() => {
                            handleOrder(item, ORDER_STATUS_DATA.delivered)
                          }}
                        >
                          {t("Order Again")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default observer(MyReturns)
