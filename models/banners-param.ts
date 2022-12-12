export interface BannerDataParam {
  title: string
  content: string
  button: BannerButtonParam
}

export interface BannerButtonParam {
  text: string
  link: string
  visible: boolean
}
