import React, { useState } from "react"
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined"
import Radio, { RadioProps } from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { useTranslation } from "react-i18next"
import { ProductParam } from "../../../models/shop-page-params"
import { FormControlLabel, FormControl } from "@material-ui/core"
import CalculatorButton from "../../../components/calculator-button"
import { shopStore } from "../../../store"
import { observer } from "mobx-react"
import _, { isEmpty } from "lodash"
import { ShopCartParam } from "../../../models/shop-cart"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"
import Toast from "../../../components/toast/toast"
import { formatAsMoney } from "../../../service/hepler"
import { ProductSelectParam } from "../../../models/product-details-param"

type Props = {
  product: ProductParam
  deviceKit: boolean
  screenProtector: boolean
  selectedWarranty: ProductSelectParam
}

const ProductTowardsCertified = ({
  product,
  deviceKit,
  screenProtector,
  selectedWarranty,
}: Props) => {
  const [t] = useTranslation()
  const delayTime = 2000

  const [addCarts, setAddCarts] = useState(1)
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [adding, setAdding] = useState(false)

  const handleAddShopCart = () => {
    const cntCarts = _.cloneDeep(shopStore.shopCarts)
    const newCart = _.cloneDeep(product) as ShopCartParam
    if (deviceKit) {
      newCart.device_kit = true
      newCart.device_kit_cost = 1.99
    }
    newCart.locked = false
    newCart.warranty_cost = 0
    newCart.cost_include_warranty = true
    newCart.included_warranty_duration_month = Number(selectedWarranty.value)
    newCart.total = addCarts
    if (screenProtector) {
      newCart.screen_protector = true
      newCart.screen_protector_cost = 7.99
    }
    cntCarts.push(newCart)
    setAdding(true)

    setTimeout(() => {
      shopStore.setShopCarts(cntCarts)
      shopStore.setCartsUpdated(true)
      // setToastParams({
      //   msg: t("Product has been added in shop cart."),
      //   isSuccess: true,
      // })
      setAdding(false)
    }, delayTime)
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

  return (
    <div className="product-towards-certified">
      <div className="shadow-card">
        <h2>{t("In Store")}</h2>
        <p style={{ margin: "8px 0" }}>
          <span>
            <CheckOutlinedIcon style={{ color: "#54BA71", marginRight: "5px" }} />
          </span>
          <span className="bold" style={{ marginRight: "10px" }}>
            {t("2 in stock")}
          </span>
          <span>71 Greentord Avenue Winnipeg MB</span>
        </p>
        <p style={{ margin: "8px 0" }}>
          <span>
            <CheckOutlinedIcon style={{ color: "#54BA71", marginRight: "5px" }} />
          </span>
          <span className="bold" style={{ marginRight: "10px" }}>
            {t("4 in stock")}
          </span>
          <span>4160 Mailing Street, Iqaluit NU</span>
        </p>
        <p className="see-more">{t("See More")}</p>
      </div>

      <div className="shadow-card">
        <h2>
          <span>
            <CheckOutlinedIcon style={{ color: "#54BA71", marginRight: "5px" }} />
          </span>
          {t("Online")}
        </h2>
        <FormControl component="fieldset">
          <RadioGroup defaultValue="store_pick" aria-label="online-radio" name="customized-radios">
            <FormControlLabel
              value="store_pick"
              control={<StyledRadio />}
              label={t("In Store Pick Up")}
            />
            <p style={{ paddingLeft: "15px" }}>
              {t("Buy online, and pick it up at 71 Greenford Avenue, Winnipeg")}
            </p>
            <FormControlLabel
              value="ship_home"
              control={<StyledRadio />}
              label={t("Ship to Home")}
            />
          </RadioGroup>
        </FormControl>
        <p className="see-more" style={{ marginTop: "15px" }}>
          {t("Estimate Shipping")}
        </p>
      </div>

      <div className="shadow-card">
        <div className="product-total-cost">
          <p className="bold">{product.name}</p>
          <p className="bold">{formatAsMoney(product.cost)}</p>
        </div>
        <p>{product.description}</p>
        <p>{t("Unlocked")}</p>
        {deviceKit ? (
          <div className="product-total-cost">
            <p className="bold">{t("DeviceKit")}</p>
            <p className="bold">{formatAsMoney(1.99)}</p>
          </div>
        ) : (
          <></>
        )}
        {screenProtector ? (
          <div className="product-total-cost">
            <p className="bold">{t("Screen Protector")}</p>
            <p className="bold">{formatAsMoney(7.99)}</p>
          </div>
        ) : (
          <></>
        )}
        {!isEmpty(selectedWarranty) ? (
          <div className="product-total-cost underlined">
            <p className="bold">{t(selectedWarranty.label)}</p>
            <p className="bold">{formatAsMoney(0)}</p>
          </div>
        ) : (
          <></>
        )}
        <div className="product-total-cost" style={{ paddingTop: "20px" }}>
          <p className="bold">{t("Subtotal")}</p>
          <p className="bold">{formatAsMoney(product.cost * addCarts + 1.99)}</p>
        </div>
        {/* <div className="product-total-cost blue-text">
          <p className="bold">{t("As Low as")}</p>
          <p className="bold">$21.99/month</p>
        </div> */}
        <div className="add-to-cart">
          <div style={{ marginRight: "10px" }}>
            <CalculatorButton addCarts={addCarts} setAddCarts={setAddCarts} />
          </div>
          <button
            style={{
              opacity: addCarts === 0 || adding ? 0.7 : "",
              cursor: addCarts === 0 || adding ? "inherit" : "",
            }}
            disabled={addCarts === 0 || adding}
            onClick={handleAddShopCart}
          >
            {t("Add to Cart")}
          </button>
        </div>
      </div>

      <div className="shadow-card certified-logo-container">
        <div className="certified-logo">
          <img src="/img/product/certified-logo.svg" alt="certified-logo" />
        </div>
      </div>

      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default observer(ProductTowardsCertified)

function StyledRadio(props: RadioProps) {
  const classes = useStyles()

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  )
}

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow: "inset 0 0 0 1px #054DFA, inset 0 -1px 0 #054DFA",
    backgroundColor: "white",
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#054DFA !important",
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
})
