export interface CategoryParam {
  id: number
  store_id: number
  name: string
  code: string
  description: string
  primary_search: boolean
  advance_search: boolean
  display_in_menu: boolean
  sort_order: number
  image_src: string
  is_system_default: boolean
  is_enabled: boolean
}

export interface BrandParam {
  id: number
  store_id: number
  name: string
  code: string
  description: string
  primary_search: boolean
  advance_search: boolean
  display_in_menu: boolean
  sort_order: number
  image_src: string
  is_system_default: boolean
  is_enabled: boolean
}

export interface SupplierParam {
  id: number
  store_id: number
  location_id: number
  company_name: string
  name: string
  address: string
  city: string
  state: string
  country: string
  contact_no: string
  email: string
  rating: number
  is_enabled: boolean
}

export interface GroupParam {
  id: number
  store_id: number
  name: string
  code: string
  is_enabled: boolean
}

export interface AttributesParam {
  id: number
  store_id: number
  product_internal_type: string
  product_attribute_group_id: number
  name: string
  code: string
  input_data_type: string
  use_for_option: boolean
  input_type: string
  mandatory: boolean
  description: string
  searchable: boolean
  default_value: string
  display_order: number
  system_default: boolean
  is_enabled: boolean
  values: AttributeValueParam[]
}

export interface AttributeValueParam {
  id: number
  product_attribute_id: number
  visual: string
  value: string
  default: boolean
  is_enabled: boolean
}

export interface AttributesGroupParam {
  id: number
  store_id: number
  product_internal_type: string
  name: string
  code: string
  description: string
  sort_order: number
  is_system_default: boolean
}

export interface ProductParam {
  id: number
  store_id: number
  brand_id: number
  brand?: BrandParam
  product_internal_type?: string
  name: string
  img_src: string
  img_alt?: string
  sku?: string
  short_description?: string
  description?: string
  net_weight?: number
  gross_weight?: number
  package_length?: number
  package_height?: number
  package_width?: number
  dimension_unit?: string
  tax_class?: string
  product_type?: string
  visibility?: string
  product_views?: number
  average_rating?: number
  is_enabled?: boolean
  display_in_search?: boolean
  sold_separately?: boolean
  sold_with_main_product_only?: boolean
  ship_with_main_product?: boolean
  is_default_product?: boolean
  shipping_required?: boolean
  require_stock: boolean
  require_stock_serial_number?: boolean
  cost_include_warranty?: boolean
  included_warranty_duration_month: number
  sort_order: number
  variants_available?: boolean
  in_the_box?: string
  available_in_store: boolean
  available_online: boolean
  sync?: number
  category?: ProductCategoryParam[] // product_category[]
  media?: ProductMediaParam[] // product_media[]
  attributes?: ProductAttributesParam[] // product_attributes[]
  faq?: ProductFaqParam[] // product_faq[]
  review?: ProductReviewsParam[] // product_reviews[]
  promotion_product?: RelatedProductPromotionParam[] // related_product_promotion[]
  inventory?: ProductInventoryParam // product_inventory
  inventory_transaction?: ProductInventoryTransactionParam[] // product_inventory_transaction[]
  supplier_id: number // my-self
  esthetic_id: number // my-self
  carrier_id: number // my-self
  color_id: number // my-self
  color?: string // my-self
  storage: number // my-self
  cost: number // my-self
}

export interface ProductGroupParam {
  product_id: number
  group_id: number
  product_group: GroupParam
}

export interface ProductMediaParam {
  product_id: number
  media_type: string
  src_path: string
  primary: boolean
  details: string
}

export interface ProductFaqParam {
  product_id: number
  question: string
  question_by_customer_id: number
  answer: string
  answer_by: string
  visible: boolean
}

export interface ProductCategoryParam {
  product_id?: number
  category_id: number
  category?: CategoryParam
}

export interface ProductAttributesParam {
  product_id: number
  attribute_id: number
  attribute: AttributesParam
  value: string
}

export interface RelatedProductPromotionParam {
  main_product_id: number
  promotion_product_id: number
  promotion_type: string
}

export interface ProductSupplierParam {
  product_id: number
  location_id: number
  supplier_id: number
  primary: boolean
}

export interface ProductReviewsParam {
  id: number
  product_id: number
  customer_id: number
  order_id: number
  review_source: string
  name: string
  review: string
  overall_rating: number
  helpful_count: number
  not_helpful_count: number
  media: ProductReviewMediaParam // product_review_media
  attributes: ProductReviewAttributeParam[] // product_review_attributes[]
  spam: ProductReviewSpamReportParam[] // product_review_spam_report[]
}

export interface ProductReviewMediaParam {
  id: number
  product_review_id: number
  media_type: string
  src_path: string
  details: string
}

export interface ProductReviewAttributeParam {
  product_review_id: number
  attribute_id: number
  value: number
}

export interface ProductReviewSpamReportParam {
  product_review_id: number
  customer_id: number
  reason: string
  is_valid: boolean
}

export interface ProductReviewLikesParam {
  product_review_id: number
  customer_id: number
  helpful: boolean
}

export interface ProductInventoryParam {
  id: number
  product_id: number
  store_id: number
  location_id: number
  actual_price: number
  part_cost: number
  service_cost: number
  warranty_cost: number
  warranty_duration_month: number
  store_price: number
  quantity: number
  bulk_order_quantity: number
  bulk_quantity_price: number
  out_of_stock_quantity: number
  min_quantity_per_cart: number
  max_quantity_per_cart: number
  backorder: boolean
  status: string
  available_serial_number: ProductInventorySerialNumberParam[] // product_inventory_serial_number[]
}

export interface ProductInventoryTransactionParam {
  product_id: number
  store_id: number
  location_id: number
  quantity: number
  mode: string
  date: string
  order_id: number
  supplier_id: number
  remarks: string
}

export interface ProductInventorySerialNumberParam {
  inventory_id: number
  product_id: number
  location_id: number
  serial_number: string
  is_sold: boolean
  order_id: number
}

export interface StoreDiscountPriceParam {
  id: number
  store_id: number
  location_id: number
  discount_price_from: string
  discount_price_till: string
  description: string
  discount_type: string
  status: string
  rules: StoreDiscountPriceRulesParam[] // store_discount_price_rules[]
  discount_products: StoreDiscountPriceProductsParam[] // store_discount_price_products[]
  product_group: StoreDiscountPriceProductGroupParam[] // store_discount_price_product_group[]
  customer_group: StoreDiscountCustomerGroupParam[] // store_discount_customer_group[]
}

export interface StoreDiscountPriceRulesParam {
  id: number
  store_discount_price_id: number
  condition_on: string
  condition_field: string
  operator: string
  condition_value: string
  apply_offer: boolean
}

export interface StoreDiscountPriceProductsParam {
  store_discount_price_id: number
  product_id: number
  discount_mode: string
  amount: number
  max_quantity: number
  sold_quantity: number
  min_quantity_per_cart: number
  max_quantity_per_cart: number
}

export interface StoreDiscountPriceProductGroupParam {
  store_discount_price_id: number
  product_group_id: number
  discount_percentage: number
  cap_amount: number
  max_quantity: number
  sold_quantity: number
  min_quantity_per_cart: number
  max_quantity_per_cart: number
}

export interface StoreDiscountCustomerGroupParam {
  store_discount_price_id: number
  customer_group_id: number
  excluded: boolean
}

export interface FilterCheckItemParam {
  label: string
  value: string | number
  id: number
  order: number
}
