import React from "react"
import MainLayout from "../layouts/main-layout"
import dynamic from "next/dynamic"

const DynamicCheckout = dynamic(() => import("../views/checkout"), { ssr: false })

export default function checkout() {
  return (
    <MainLayout>
      <DynamicCheckout />
    </MainLayout>
  )
}
