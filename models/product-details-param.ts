export interface WorkWithParam {
  id: number
  name: string
  img_src: string
}

export interface ProductColorParam {
  id: number
  color: string
}

export interface ProductStorageParam {
  id: number
  value: number
}

export interface ProductConditionParam {
  id: number
  name: string
  code: string
  availability: boolean
  cost: number
}

export interface ProductSelectParam {
  label: string
  value: number | string
}

export interface QualityGradingParam {
  id: number
  name: string
  abstract: string
  description: string
  data: QualityGradingDataParam[]
  preview: QualityGradingPreviewParam
}

export interface QualityGradingDataParam {
  name: string
  img_src: string
}

export interface QualityGradingPreviewParam {
  front: string
  back: string
}

export interface ProductFaqParam {
  id: number
  question: string
  answers: ProductFaqAnswerParam[]
}

export interface ProductFaqAnswerParam {
  text: string
  link: null | ProductFaqLinkParam
}

export interface ProductFaqLinkParam {
  text: string
  href: string
}
