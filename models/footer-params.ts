export interface LinkDataParam {
  title: string
  order: number
  visible: boolean
  child: LinkDataChildParam[]
}

export interface LinkDataChildParam {
  name: string
  link: string
  order: number
  visible: boolean
}

export interface PaymentsParam {
  img_src: string
  visible: boolean
  order: number
}

export interface SocialsParam {
  img_src: string
  link: string
  order: number
  visible: boolean
}
