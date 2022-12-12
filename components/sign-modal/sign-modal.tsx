import React, { useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { useTranslation } from "react-i18next"
import { Tabs, Tab, AppBar, Box, IconButton } from "@material-ui/core"
import { SignParam } from "../../models/sign-params"
import SwipeableViews from "react-swipeable-views"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import SignForm from "./sign-form"
import CloseIcon from "@material-ui/icons/Close"
import { ToastMsgParams } from "../toast/toast-msg-params"
import { observer } from "mobx-react"
import { authStore } from "../../store"

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  setToastParams: (val: ToastMsgParams) => void
}

const SignModal = ({ open, setOpen, setToastParams }: Props) => {
  const theme = useTheme()
  const [t] = useTranslation()

  const [signKey, setSignKey] = useState<SignParam>("login")
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setTabValue(index)
  }

  const handleClose = () => {
    authStore.setProgressForCheckout(false)
    setOpen(false)
    setSignKey("login")
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="sign-modal"
    >
      <div className="sign-modal-container">
        <IconButton className="icon-button" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <h1>{signKey === "login" ? t("Welcome Back") : t("New Here?")}</h1>
        {signKey === "signup" && (
          <p className="sign-content">{t("Create a customer account with us!")}</p>
        )}

        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab icon={<AccountCircleIcon />} label={t("Customer")} />
            {/* <Tab icon={<AccountCircleIcon />} label={t("Merchant")} /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabValue}
          onChangeIndex={handleChangeIndex}
          className="custom-swipeable-views custom-scroll-bar"
        >
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <SignForm
              signKey={signKey}
              setSignKey={setSignKey}
              onCloseModal={handleClose}
              setToastParams={setToastParams}
            />
            <div className="sign-footer">
              <p>
                {t("© 2021 DeviceList 1.0.2. All Rights Reserved.")}{" "}
                <span>
                  <a href="#">{t("Privacy")}</a>
                </span>
                {" | "}
                <span>
                  <a href="#">{t("Terms & Conditions")}</a>
                </span>
                {" | "}
                <span>
                  <a href="#">{t("Help")}</a>
                </span>
              </p>
            </div>
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            MerChant
          </TabPanel>
        </SwipeableViews>
      </div>
    </Modal>
  )
}

export default observer(SignModal)
