export interface CheckPassParam {
  status: boolean
  msg: string
  strength: "Weak" | "Fair" | "Strong"
  character?: boolean
  number?: boolean
  letter?: boolean
}
