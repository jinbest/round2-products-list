export interface AboutUsSec2DataParam {
  title: string
  order: number
  visible: boolean
  img: ImageDataParam
  child: AboutUsSec2DataChildParam[]
}

export interface AboutUsSec2DataChildParam {
  title: string
  content: string
  listData: string[]
  order: number
  visible: boolean
}

export interface ImageDataParam {
  img_src: string
  alt: string
}

export interface AboutUsSec4Param {
  title: string
  type: string
  content: string[]
}
