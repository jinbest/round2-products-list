import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import { useTranslation } from "react-i18next"
import CloseIcon from "@material-ui/icons/Close"
import { IconButton } from "@material-ui/core"
import { observer } from "mobx-react"
import { authStore } from "../../../store"
import Loading from "../../../components/Loading"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

const DeleteAccount = ({ open, setOpen }: Props) => {
  const [t] = useTranslation()
  const delayTime = 2000

  const [deleted, setDeleted] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setDeleted(false)
    if (deleted) {
      authStore.setAuthUser("")
    }
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      authStore.setMockCredential({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      })
      authStore.setAccountDataInitialize()
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
          <h1>{t("Delete Account Permanently")}</h1>
        ) : (
          <h1 style={{ margin: "15px 0 20px" }}>{t("We'll miss you.")}</h1>
        )}
        {!deleted ? (
          <p className="account-modal-content" style={{ margin: "20px 0" }}>
            {t(
              "By deleting your account you will lose access to all benefits and discounts. This cannot be undone."
            )}
          </p>
        ) : (
          <>
            <p className="account-modal-content" style={{ margin: "5px" }}>
              {t("Your account has been successfully deleted.")}
            </p>
            <p className="account-modal-content" style={{ margin: "5px" }}>
              {t("We are sorry to see you leave.")}
            </p>
            <p className="account-modal-content" style={{ margin: "5px" }}>
              {t("You are always welcome to join DeviceList again!")}
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
                t("Yes, Delete Account")
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

export default observer(DeleteAccount)
