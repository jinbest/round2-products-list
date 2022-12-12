export interface VendorProfileShopParam {
  name: string
  img_src: string
  capacity: string
  color: string
  cost: number
  asLowas: string
  warranty: number | null
  warranty_unit: string | null
  status: string
}

export interface VendorProfileReviewsParam {
  name: string
  comments: string
  day: string
  score: number
}
