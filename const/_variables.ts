import {
  CheckoutProgressStatusParam,
  DeliveryOptionParam,
  PaymentOptionParam,
} from "../models/checkout-params"
import { locationsData } from "../static/mock/mock-data"
import { getAddress } from "../service/hepler"

const DAYS_OF_THE_WEEK: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const CHECKOUT_PROGRESS_STATUS = {
  cart: "cart" as CheckoutProgressStatusParam,
  account: "account" as CheckoutProgressStatusParam,
  shipping: "shipping" as CheckoutProgressStatusParam,
  payment: "payment" as CheckoutProgressStatusParam,
  confirmation: "confirmation" as CheckoutProgressStatusParam,
}

const SHIPPING_STEP_STATUS = {
  order_address: "order_address",
  billing_address: "billing_address",
  confirm_order_address: "confirm_order_address",
  confirm_billing_address: "confirm_billing_address",
  delivery_options: "delivery_options",
}

const PAYMENT_STEP_STATUS = {
  confirm_and_pay: "confirm_and_pay",
  review_order: "review_order",
}

const SHIPPING_FORM_TITLE = {
  order_address: "Where do you want your order sent?",
  billing_address: "What's your billing address?",
  confirm_order_address: "Confirm your delivery address",
  confirm_billing_address: "Confirm your billing address",
  delivery_options: "Delivery Options",
}

const DELIVERY_OPTIONS = {
  ground: {
    code: "ground_shipping" as DeliveryOptionParam,
    text: "Ground Shipping: 1-5 Business Days",
    cost: 10.99,
  },
  express: {
    code: "express_shipping" as DeliveryOptionParam,
    text: "Express Shipping: 1-3 Business Days",
    cost: 15.99,
  },
  pick_up: {
    code: "pick_up",
    text: "Pick up in Store" as DeliveryOptionParam,
    cost: "Free",
  },
}

const SELECT_LOCATIONS = locationsData.map((item) => ({
  id: item.id,
  name: item.location_name,
  address: getAddress(item).trim(),
}))

const PAYMENT_OPTIONS = {
  credit_debit: {
    code: "credit_debit" as PaymentOptionParam,
    text: "Credit or Debit Card",
  },
}

const regxCVV = /^[0-9]{0,3}$/,
  regxExpiry = /^[0-9]{0,2}(\/|)[0-9]{0,2}$/,
  regxCardNumber = /^[0-9]{0,16}$/

const ORDER_STATUS_DATA = {
  in_transit: "IN TRANSIT",
  delivered: "DELIVERED",
  cancelled: "CANCELLED",
  returned: "RETURNED",
}

export {
  DAYS_OF_THE_WEEK,
  CHECKOUT_PROGRESS_STATUS,
  SHIPPING_STEP_STATUS,
  SHIPPING_FORM_TITLE,
  DELIVERY_OPTIONS,
  SELECT_LOCATIONS,
  PAYMENT_OPTIONS,
  PAYMENT_STEP_STATUS,
  regxCVV,
  regxExpiry,
  regxCardNumber,
  ORDER_STATUS_DATA,
}
