import React, { useState, useEffect } from "react"
import { PRODUCTS } from "../../static/mock/shop"
import { ProductParam } from "../../models/shop-page-params"
import _, { isEmpty } from "lodash"
import Section1 from "./Section1"

type Props = {
  product_id: number
}

const ProductDetails = ({ product_id }: Props) => {
  const [product, setProduct] = useState<ProductParam>({} as ProductParam)

  useEffect(() => {
    const prod = _.find(PRODUCTS, { id: product_id })
    if (prod && !isEmpty(prod)) {
      setProduct(prod)
    }
  }, [product_id])

  return (
    <div className="product-details">{!isEmpty(product) && <Section1 product={product} />}</div>
  )
}

export default ProductDetails
