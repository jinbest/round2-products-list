import { action, autorun, configure, observable, makeAutoObservable } from "mobx"
import _ from "lodash"
import { ShopCartParam } from "../models/shop-cart"
import {
  CheckoutProgressStatusParam,
  DeliveryOptionParam,
  SelectedLocationParam,
} from "../models/checkout-params"
import { CHECKOUT_PROGRESS_STATUS, DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../const/_variables"
import { PaymentOptionParam } from "../models/checkout-params"
import { PaymentCardInfoParam, MyOrdersParam } from "../models/account-param"
import { AddressParam } from "../models/customer-data-params"
import { AddressLists } from "../static/mock/address-data"

configure({ enforceActions: "always" })

const orderAddresses = _.filter(AddressLists, (o) => o.address_type === "SHIPPING"),
  billingAddresses = _.filter(AddressLists, (o) => o.address_type === "BILLING")

export class ShopStore {
  @observable shopCarts = [] as ShopCartParam[]
  @observable progressStatus = CHECKOUT_PROGRESS_STATUS.cart
  @observable orderAddress = orderAddresses.length ? orderAddresses[0] : ({} as AddressParam)
  @observable billingAddress = billingAddresses.length ? billingAddresses[0] : ({} as AddressParam)
  @observable deliveryOption = DELIVERY_OPTIONS.ground.code
  @observable selectedLocation = {} as SelectedLocationParam
  @observable paymentMethod = PAYMENT_OPTIONS.credit_debit.code
  @observable creditCardInfo = {} as PaymentCardInfoParam
  @observable address_list = _.cloneDeep(AddressLists)
  @observable orderedData = [] as MyOrdersParam[]
  @observable cartsUpdated = false

  constructor() {
    this.load()
    autorun(this.save)
    makeAutoObservable(this)
  }

  private save = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ShopStore.name,
        JSON.stringify({
          shopCarts: this.shopCarts,
          progressStatus: this.progressStatus,
          orderAddress: this.orderAddress,
          billingAddress: this.billingAddress,
          deliveryOption: this.deliveryOption,
          selectedLocation: this.selectedLocation,
          paymentMethod: this.paymentMethod,
          creditCardInfo: this.creditCardInfo,
          address_list: this.address_list,
          orderedData: this.orderedData,
          cartsUpdated: this.cartsUpdated,
        })
      )
    }
  }

  @action
  private load = () => {
    if (
      typeof window !== "undefined" &&
      window.localStorage !== null &&
      typeof window.localStorage !== "undefined"
    ) {
      Object.assign(this, JSON.parse(window.localStorage.getItem(ShopStore.name) || "{}"))
    }
  }

  @action
  setShopCarts = (shopCarts: ShopCartParam[]) => {
    this.shopCarts = shopCarts
    this.save()
  }

  @action
  setProgressStatus = (progressStatus: CheckoutProgressStatusParam) => {
    this.progressStatus = progressStatus
    this.save()
  }

  @action
  setOrderAddress = (val: AddressParam) => {
    this.orderAddress = val
    this.save()
  }

  @action
  setBillingAddress = (val: AddressParam) => {
    this.billingAddress = val
    this.save()
  }

  @action
  setDeliveryOption = (val: DeliveryOptionParam) => {
    this.deliveryOption = val
    this.save()
  }

  @action
  setSelectedLocation = (val: SelectedLocationParam) => {
    this.selectedLocation = val
    this.save()
  }

  @action
  setPaymentMethod = (val: PaymentOptionParam) => {
    this.paymentMethod = val
    this.save()
  }

  @action
  setCreditCardInfo = (val: PaymentCardInfoParam) => {
    this.creditCardInfo = val
    this.save()
  }

  @action
  setAddressLists = (val: AddressParam[]) => {
    this.address_list = val
    this.save()
  }

  @action
  setOrderedData = (val: MyOrdersParam[]) => {
    this.orderedData = val
    this.save()
  }

  @action
  setCartsUpdated = (val: boolean) => {
    this.cartsUpdated = val
    this.save()
  }

  @action
  init = () => {
    this.shopCarts = [] as ShopCartParam[]
    this.progressStatus = CHECKOUT_PROGRESS_STATUS.cart
    this.orderAddress = orderAddresses.length ? orderAddresses[0] : ({} as AddressParam)
    this.billingAddress = billingAddresses.length ? billingAddresses[0] : ({} as AddressParam)
    this.deliveryOption = DELIVERY_OPTIONS.ground.code
    this.selectedLocation = {} as SelectedLocationParam
    this.paymentMethod = PAYMENT_OPTIONS.credit_debit.code
    this.creditCardInfo = {} as PaymentCardInfoParam
    this.address_list = [] as AddressParam[]
    this.orderedData = [] as MyOrdersParam[]
    this.cartsUpdated = false
    this.save()
  }
}

export default new ShopStore()
