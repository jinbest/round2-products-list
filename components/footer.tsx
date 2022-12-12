import React, { useState } from "react"
import config from "../static/config.json"
import _ from "lodash"
import {
  LinkDataParam,
  LinkDataChildParam,
  PaymentsParam,
  SocialsParam,
} from "../models/footer-params"
import Link from "next/link"
import { useTranslation } from "react-i18next"

const Footer = () => {
  const [t] = useTranslation()

  const thisData = _.cloneDeep(config.footer)
  const footerLinksData = _.sortBy(thisData.linkData, (o) => o.order)
  const payments = _.sortBy(thisData.payments, (o) => o.order)
  const socials = _.sortBy(thisData.socials, (o) => o.order)

  const [expand, setExpand] = useState(false)

  return (
    <div className="footer" style={{ position: expand ? "inherit" : "fixed" }}>
      <div className="footer-container">
        <div className="flex align-center justify-between">
          <p className="copyright">{t(thisData.reserved)}</p>
          <div
            onClick={() => {
              setExpand(!expand)
            }}
            className="expand-icon"
          >
            {!expand ? (
              <img src="/img/icons/scale-up.png" alt="scale-up" />
            ) : (
              <img src="/img/icons/scale-down.png" alt="scale-down" />
            )}
          </div>
        </div>
        <p className="copyright">{t(thisData.copyright)}</p>
        {expand && (
          <div className="footer-contents-container">
            <div className="footer-infos">
              <p>{t(thisData.companyName)}</p>
              <div className="flex align-center flex-wrap">
                <a className="no-wrap" href={`tel:${thisData.phoneNumber}`}>
                  {thisData.phoneNumber}
                </a>
                <span>&nbsp;|&nbsp;</span>
                <a className="no-wrap" href={`mailto:${thisData.email}`}>
                  {thisData.email}
                </a>
              </div>
              <p>{thisData.address}</p>
            </div>
            <div className="footer-links-container">
              {footerLinksData.map((item: LinkDataParam, index: number) => {
                return (
                  <React.Fragment key={index}>
                    {item.visible && (
                      <div>
                        <p style={{ fontWeight: 600 }}>{t(item.title)}</p>
                        {_.sortBy(item.child, (o) => o.order).map(
                          (it: LinkDataChildParam, idx: number) => {
                            return (
                              <React.Fragment key={`${index}-${idx}`}>
                                {it.visible && (
                                  <Link href={it.link}>
                                    <a>{t(it.name)}</a>
                                  </Link>
                                )}
                              </React.Fragment>
                            )
                          }
                        )}
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
            <div className="footer-logos">
              <div>
                <p>{t("Payments 100% secured")}</p>
                <div className="flex flex-wrap align-center">
                  {payments.map((item: PaymentsParam, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        {item.visible && (
                          <img className="payment" src={item.img_src} alt={`payment-${index}`} />
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
              <div className="flex align-center" style={{ marginTop: "10px" }}>
                {socials.map((item: SocialsParam, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {item.visible && (
                        <Link href={item.link}>
                          <a>
                            <img className="social" src={item.img_src} alt={`social-${index}`} />
                          </a>
                        </Link>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer
