import React from "react"
import MainLayout from "../../layouts/main-layout"
import { useRouter } from "next/router"
import ProductDetails from "../../views/product"

export default function product() {
  const router = useRouter()
  const { product_id } = router.query

  return <MainLayout>{product_id && <ProductDetails product_id={Number(product_id)} />}</MainLayout>
}
