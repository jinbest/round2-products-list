export type CheckoutProgressStatusParam =
  | "cart"
  | "account"
  | "shipping"
  | "payment"
  | "confirmation"

export interface ProgressShippingFormParam {
  firstName: string
  lastName: string
  companyName: string
  address_1: string
  address_2: string
  city: string
  postcode: string
  country: string
  state: string
  phone: string
  billing_address: boolean
}

export interface SelectedLocationParam {
  id: number
  name: string
  address: string
}

export type DeliveryOptionParam = "ground_shipping" | "express_shipping" | "pick_up"

export type PaymentOptionParam = "credit_debit" | "paypal"
