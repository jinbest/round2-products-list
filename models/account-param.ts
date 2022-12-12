import { AddressTypeParam, AddressParam } from "./customer-data-params"
import { ShopCartParam } from "./shop-cart"
export interface AddressBookFormParam {
  address_1: string
  address_2: string
  city: string
  state: string
  country: string
  postcode: string
  billing?: boolean
  delivery?: boolean
}

export interface SelectParam {
  name: string
  code: string
}

export interface AddressBookParam {
  title: string
  type: AddressTypeParam
  info: AddressParam
}

export interface MyOrdersParam {
  date: string
  order: number
  status: string
  paymentToken: string
  cost: number
  data: ShopCartParam
}

export interface PaymentParam {
  type: string
  name: string
  logos: ImageDataParam[]
  cardInfo: PaymentCardInfoParam
}

export interface PaymentCardInfoParam {
  name: string
  number: string
  expiryDate: string
  cvv: string
}

export interface ImageDataParam {
  img_src: string
  alt: string
}
