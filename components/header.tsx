import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Search from "./search"
import config from "../static/config.json"
import _ from "lodash"
import LangDropdown from "./lang-drop-down"
import { useTranslation } from "react-i18next"
import HeaderDrawer from "./header-drawer"
import SignModal from "./sign-modal/sign-modal"
import { observer } from "mobx-react"
import { authStore } from "../store"
import { ToastMsgParams } from "./toast/toast-msg-params"
import Toast from "./toast/toast"
import dynamic from "next/dynamic"

const DynamicShopCart = dynamic(() => import("./shop-cart"), { ssr: false }) as any

const Header = () => {
  const [t] = useTranslation()

  const router = useRouter()
  const thisPage = _.cloneDeep(config.headerData.navData)
  const secondaryNav = thisPage.secondary

  const [searchKey, setSearchKey] = useState("")
  const [filter, setFilter] = useState("Flash Sale!")
  const [openSignModal, setOpenSignModal] = useState(false)
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    console.log("searchKey", searchKey)
    setSearchKey("")
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

  const handleMyAccount = () => {
    if (!authStore.authUser) {
      return t("Log In")
    } else {
      return t("My Account")
    }
  }

  return (
    <div className="header">
      <div className="header-brand">
        <LangDropdown />
        <p
          className="brand-login"
          onClick={() => {
            if (!authStore.authUser) {
              setOpenSignModal(true)
            } else {
              router.push("/account")
            }
          }}
          suppressHydrationWarning
        >
          {handleMyAccount()}
        </p>
      </div>
      <div className="header-content-1">
        <div className="logo">
          <Link href="/">
            <a>
              <img src={thisPage.primary.logo} alt="logo" />
            </a>
          </Link>
        </div>
        <div className="search-container-desktop">
          <Search
            value={searchKey}
            handleChange={(val) => {
              setSearchKey(val)
            }}
            handleIconClick={handleIconClick}
          />
        </div>
        <div className="flex">
          <div className="nav-buttons">
            {/* <img src="/img/icons/heart.png" alt="heart-icon" /> */}
            <DynamicShopCart />
            <HeaderDrawer />
          </div>
        </div>
      </div>
      <div className="search-container-mobile">
        <Search
          value={searchKey}
          handleChange={(val) => {
            setSearchKey(val)
          }}
          handleIconClick={handleIconClick}
        />
      </div>
      <div className="header-content-2">
        <div>
          {secondaryNav.map((item: string, index: number) => {
            return (
              <p
                key={index}
                style={{ color: item === filter ? "#4360fa" : "" }}
                onClick={() => {
                  setFilter(item)
                }}
              >
                {t(item)}
              </p>
            )
          })}
        </div>
      </div>
      <SignModal open={openSignModal} setOpen={setOpenSignModal} setToastParams={setToastParams} />
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default observer(Header)
