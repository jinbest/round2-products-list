import { Base } from "./base"

export interface AddressParam extends Base {
  id: number
  customer_id: number
  first_name: string
  last_name: string
  company: string | null
  address_1: string
  address_2: string | null
  address_3: string | null
  city: string
  state: string
  postcode: string
  country: string
  email: string
  phone: string | null
  address_type: AddressTypeParam
}

export type AddressKeyParam =
  | "first_name"
  | "last_name"
  | "company"
  | "address_1"
  | "address_2"
  | "address_3"
  | "city"
  | "state"
  | "postcode"
  | "country"
  | "email"
  | "phone"
  | "id"
  | "customer_id"

export type AddressTypeParam = "SHIPPING" | "BILLING"
