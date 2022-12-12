import React, { useState, useRef } from "react"
import { observer } from "mobx-react"
import { authStore, shopStore } from "../../../store"
import { useTranslation } from "react-i18next"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import DeleteAddress from "../modal/delete-address"
import { isEmpty } from "lodash"
import statesData from "../../../const/statesData"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"
import Toast from "../../../components/toast/toast"
import { formatCountryName, formatAddress } from "../../../service/hepler"
import AddressBookForm from "./address-book-form"
import { FormGroup, FormControl, FormControlLabel, Checkbox } from "@material-ui/core"
import { AddressParam, AddressTypeParam } from "../../../models/customer-data-params"

const AddressBook = () => {
  const [t] = useTranslation()
  const formikRef = useRef<any>()

  const [addStatus, setAddStatus] = useState(false)
  const [editAddressType, setEditAddressType] = useState<AddressTypeParam | number>(-1)
  const [editAddress, setEditAddress] = useState<AddressParam>({} as AddressParam)
  const [deleteAddressType, setDeleteAddressType] = useState<AddressTypeParam | number>(-1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteTitle, setDeleteTitle] = useState("")
  const [deleteInfo, setDeleteInfo] = useState<AddressParam>({} as AddressParam)
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [states, setStates] = useState<any[]>(statesData["CA"])
  const [inputAddressStatus, setInputAddressStatus] = useState(false)

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
      <p className="details-title">{t(authStore.accountData.addressBook.title)}</p>
      {!addStatus &&
        editAddressType < 0 &&
        (isEmpty(shopStore.orderAddress) || isEmpty(shopStore.billingAddress)) && (
          <button
            className="icon-button"
            onClick={() => {
              setEditAddressType(-1)
              setAddStatus(true)
            }}
          >
            <span>
              <img src="/img/icons/plus.png" alt="plus" />
            </span>
          </button>
        )}
      <div className="account-details-viewer">
        {!addStatus ? (
          <>
            {!isEmpty(shopStore.orderAddress) && (
              <div className="account-address">
                <div className="account-address-header">
                  <p>{t("Delivery Address")}</p>
                  {editAddressType !== "SHIPPING" && (
                    <div
                      onClick={() => {
                        setEditAddressType("SHIPPING")
                        setEditAddress(shopStore.orderAddress)
                      }}
                    >
                      <EditOutlinedIcon style={{ color: "#CBBBFA" }} />
                    </div>
                  )}
                </div>
                {editAddressType !== "SHIPPING" && (
                  <div className="account-address-content">
                    <p>{`${shopStore.orderAddress.first_name} ${shopStore.orderAddress.last_name}`}</p>
                    <p>
                      {formatAddress(
                        shopStore.orderAddress.address_1,
                        shopStore.orderAddress.address_2
                      )}
                    </p>
                    <p>{`${shopStore.orderAddress.city}, ${shopStore.orderAddress.state} ${shopStore.orderAddress.postcode}`}</p>
                    <p>{formatCountryName(shopStore.orderAddress.country)}</p>
                  </div>
                )}
                {editAddressType !== "SHIPPING" && (
                  <button
                    className="delete-address"
                    onClick={() => {
                      setDeleteTitle("Delivery Address")
                      setDeleteInfo(shopStore.orderAddress)
                      setDeleteAddressType("SHIPPING")
                      setDeleteModal(true)
                    }}
                  >
                    {t("Delete address")}
                  </button>
                )}
                {editAddressType === "SHIPPING" && (
                  <AddressBookForm
                    ref={formikRef}
                    states={states}
                    editAddressType={editAddressType}
                    addStatus={addStatus}
                    setStates={setStates}
                    setEditAddressType={setEditAddressType}
                    setAddStatus={setAddStatus}
                    setToastParams={setToastParams}
                    editAddress={editAddress}
                  />
                )}
              </div>
            )}

            {!isEmpty(shopStore.billingAddress) && (
              <div className="account-address">
                <div className="account-address-header">
                  <p>{t("Billing Address")}</p>
                  {editAddressType !== "BILLING" && (
                    <div
                      onClick={() => {
                        setEditAddressType("BILLING")
                        setEditAddress(shopStore.billingAddress)
                      }}
                    >
                      <EditOutlinedIcon style={{ color: "#CBBBFA" }} />
                    </div>
                  )}
                </div>
                {editAddressType !== "BILLING" && (
                  <div className="account-address-content">
                    <p>{`${shopStore.billingAddress.first_name} ${shopStore.billingAddress.last_name}`}</p>
                    <p>
                      {formatAddress(
                        shopStore.billingAddress.address_1,
                        shopStore.billingAddress.address_2
                      )}
                    </p>
                    <p>{`${shopStore.billingAddress.city}, ${shopStore.billingAddress.state} ${shopStore.billingAddress.postcode}`}</p>
                    <p>{formatCountryName(shopStore.billingAddress.country)}</p>
                  </div>
                )}
                {editAddressType !== "BILLING" && (
                  <button
                    className="delete-address"
                    onClick={() => {
                      console.log("here")
                      setDeleteTitle("Billing Address")
                      setDeleteInfo(shopStore.billingAddress)
                      setDeleteAddressType("BILLING")
                      setDeleteModal(true)
                    }}
                  >
                    {t("Delete address")}
                  </button>
                )}
                {editAddressType === "BILLING" && (
                  <AddressBookForm
                    ref={formikRef}
                    states={states}
                    editAddressType={editAddressType}
                    addStatus={addStatus}
                    setStates={setStates}
                    setEditAddressType={setEditAddressType}
                    setAddStatus={setAddStatus}
                    setToastParams={setToastParams}
                    editAddress={editAddress}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <div className="account-address">
            <div className="account-address-header">
              <p>{t("New Address")}</p>
              <FormControl
                className="custom-form-control"
                component="fieldset"
                style={{ padding: 0 }}
              >
                <FormGroup className="form-group">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inputAddressStatus}
                        onChange={(e) => {
                          setInputAddressStatus(e.target.checked)
                        }}
                        name="inputAddressStatus"
                        color="primary"
                      />
                    }
                    label={t("Input New Address")}
                  />
                </FormGroup>
              </FormControl>
            </div>

            <AddressBookForm
              ref={formikRef}
              states={states}
              editAddressType={editAddressType}
              addStatus={addStatus}
              setStates={setStates}
              setEditAddressType={setEditAddressType}
              setAddStatus={setAddStatus}
              setToastParams={setToastParams}
              inputAddressStatus={inputAddressStatus}
              editAddress={{} as AddressParam}
            />
          </div>
        )}
      </div>

      {deleteAddressType !== -1 && !isEmpty(deleteInfo) && (
        <DeleteAddress
          open={deleteModal}
          setOpen={setDeleteModal}
          deleteAddressType={deleteAddressType}
          deleteTitle={deleteTitle}
          deleteInfo={deleteInfo}
        />
      )}
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default observer(AddressBook)
