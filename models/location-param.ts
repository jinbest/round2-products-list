import { Base } from "./base"

export interface LocationParam extends Base {
  id: number
  vendor_id: number
  location_name: string
  is_main: boolean
  description: string
  address_1: string
  address_2: string
  address_3: string
  country: string
  city: string
  state: string
  postcode: string
  email: string
  phone: string
  timezone: string
  latitude: number
  longitude: number
  distance: number
  business_page_link: string
  is_voided: boolean
  hours: any[]
  locAvailability?: string[]
}

export interface LocationHoursParam extends Base {
  id: number
  location_id: number
  vendor_id: number
  day: number
  open: string
  close: string
  type: string
  by_appointment_only: boolean
  is_voided: boolean
}
