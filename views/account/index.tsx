import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { authStore } from "../../store"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { isEmpty } from "lodash"
import MyDetails from "./compo/my-details"
import AddressBook from "./compo/address-book"
import MyOrders from "./compo/my-orders"
import MyReturns from "./compo/my-returns"
import PaymentMethods from "./compo/payment-methods"
import ContactPreferences from "./compo/contact-preferences"
import NeedHelp from "./compo/need-help"
import { getWidth } from "../../service/hepler"
import LeftArrow from "../../components/svg/left-arrow"
import RightArrow from "../../components/svg/right-arrow"

const MyAccount = () => {
  const router = useRouter()
  const [t] = useTranslation()
  const keys = Object.keys(authStore.accountData)

  const [tab, setTab] = useState(0)

  const [viewMenu, setViewMenu] = useState(true)
  const [mobile, setMobile] = useState(false)

  const handleResize = () => {
    if (getWidth() < 625) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }

  useEffect(() => {
    handleResize()
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  useEffect(() => {
    if (!authStore.authUser) {
      router.push("/")
    }
  }, [authStore.authUser])

  const handleSignOut = () => {
    authStore.setAuthUser("")
  }

  const _getTitle_ = (key: string, obj: Record<string, any>) => {
    return obj[key].title
  }

  return (
    <div className="my-account">
      <div className="container">
        {(!mobile || (mobile && viewMenu)) && (
          <div className="account-menu-bar">
            <div>
              {!isEmpty(authStore.accountData) && (
                <>
                  {keys.map((item: string, index: number) => (
                    <p
                      key={index}
                      style={{ color: index === tab ? "#4360FA" : "" }}
                      onClick={() => {
                        setTab(index)
                        setViewMenu(false)
                      }}
                    >
                      {t(_getTitle_(item, authStore.accountData))}
                    </p>
                  ))}
                </>
              )}
            </div>
            <div>
              <p className="underline" onClick={handleSignOut}>
                {t("Sign Out")}
              </p>
            </div>
            {mobile && (
              <div
                className="mobile-switcher-view"
                style={{ position: "absolute", right: "-33px", top: 0 }}
                onClick={() => {
                  setViewMenu(false)
                }}
              >
                <LeftArrow color="#323232" />
              </div>
            )}
          </div>
        )}
        {(!mobile || (mobile && !viewMenu)) && (
          <>
            {tab === 0 && <MyDetails />}
            {tab === 1 && <AddressBook />}
            {tab === 2 && <MyOrders />}
            {tab === 3 && <MyReturns />}
            {tab === 4 && <PaymentMethods />}
            {tab === 5 && <ContactPreferences />}
            {tab === 6 && <NeedHelp />}
          </>
        )}
      </div>
      {mobile && !viewMenu && (
        <div
          className="mobile-switcher-view"
          onClick={() => {
            setViewMenu(true)
          }}
          style={{ left: 0, position: "fixed", top: "210px" }}
        >
          <RightArrow color="#323232" />
        </div>
      )}
    </div>
  )
}

export default observer(MyAccount)
