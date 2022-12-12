import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import { useTranslation } from "react-i18next"
import CloseIcon from "@material-ui/icons/Close"
import { IconButton } from "@material-ui/core"
import { observer } from "mobx-react"
import { shopStore } from "../../../store"
import Loading from "../../../components/Loading"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { formatCountryName, formatAddress } from "../../../service/hepler"
import { AddressParam, AddressTypeParam } from "../../../models/customer-data-params"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  deleteAddressType: number | AddressTypeParam
  deleteTitle: string
  deleteInfo: AddressParam
}

const DeleteAddress = ({ open, setOpen, deleteAddressType, deleteTitle, deleteInfo }: Props) => {
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
    setTimeout(() => {
      setDeleted(true)
      if (deleteAddressType === "BILLING") {
        shopStore.setBillingAddress({} as AddressParam)
      } else if (deleteAddressType === "SHIPPING") {
        shopStore.setOrderAddress({} as AddressParam)
      }
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
          <h1>{`${t("Delete")} ${t(deleteTitle)}`}</h1>
        ) : (
          <h1 style={{ margin: "15px 0 20px" }}>{t("Success!")}</h1>
        )}
        {!deleted ? (
          <>
            <p className="account-modal-content" style={{ margin: "25px 0" }}>
              {`${t("Are you sure you want to delete the following")} ${t(deleteTitle)}?`}
            </p>
            <p className="account-modal-content">{`${deleteInfo.first_name} ${deleteInfo.last_name}`}</p>
            <p className="account-modal-content">
              {formatAddress(deleteInfo.address_1, deleteInfo.address_2)}
            </p>
            <p className="account-modal-content">{`${deleteInfo.city}, ${deleteInfo.state} ${deleteInfo.postcode}`}</p>
            <p className="account-modal-content" style={{ marginBottom: "20px" }}>
              {formatCountryName(deleteInfo.country)}
            </p>
          </>
        ) : (
          <>
            <p className="account-modal-content" style={{ margin: "10px 0" }}>
              {`${t("The following")} ${t(deleteTitle)} ${t("has been deleted from your account")}`}
              :
            </p>
            <p className="account-modal-content">{`${deleteInfo.first_name} ${deleteInfo.last_name}`}</p>
            <p className="account-modal-content">
              {formatAddress(deleteInfo.address_1, deleteInfo.address_2)}
            </p>
            <p className="account-modal-content">{`${deleteInfo.city}, ${deleteInfo.state} ${deleteInfo.postcode}`}</p>
            <p className="account-modal-content">{formatCountryName(deleteInfo.country)}</p>
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

export default observer(DeleteAddress)
