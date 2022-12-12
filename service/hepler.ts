import { CheckPassParam } from "../models/check-pass-params"
import { LocationParam, LocationHoursParam } from "../models/location-param"
import moment from "moment-timezone"
import { VendorProfileReviewsParam } from "../models/vendor-profile-param"
import {
  ProductCategoryParam,
  FilterCheckItemParam,
  ProductParam,
} from "../models/shop-page-params"
import _ from "lodash"

export function ValidateEmail(e: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(e)
}

export function CheckConfPass(confPass: string, pass: string) {
  if (pass === confPass) {
    return true
  } else {
    return false
  }
}

export function CheckPassword(pass: string) {
  const result: CheckPassParam = {
    status: false,
    msg: "Password is too weak.",
    strength: "Weak",
    letter: false,
    number: false,
    character: false,
  }
  if (!pass) {
    return result
  }
  if (pass.length < 8) {
    result.msg = "Password Should be 8 Characters at least."
    if (pass.match(/[A-Z]+/) || pass.match(/[a-z]+/)) {
      result.letter = true
    }
    if (pass.match(/[0-9]+/)) {
      result.number = true
    }
  } else {
    let strength = 0
    result.character = true
    if (pass.match(/[a-z]+/)) {
      strength += 1
      result.letter = true
    }
    if (pass.match(/[A-Z]+/)) {
      strength += 1
      result.letter = true
    }
    if (pass.match(/[0-9]+/)) {
      strength += 1
      result.number = true
    }
    if (pass.match(/[$@#&!]+/)) {
      strength += 1
    }
    if (strength < 2) {
      result.msg = "Password is too weak."
    } else if (strength < 3) {
      result.status = true
      result.msg = "Password is fair."
      result.strength = "Fair"
    } else {
      result.status = true
      result.msg = "Password is strong."
      result.strength = "Strong"
    }
  }
  return result
}

export function getAddress(location: LocationParam) {
  if (!location) return ""
  return `${location.address_1}, ${location.address_2 ? location.address_2 + ", " : ""}${
    location.city ? location.city + ", " : ""
  } ${location.state ? location.state + " " : ""} ${
    location.postcode
      ? location.postcode.substring(0, 3) +
        " " +
        location.postcode.substring(3, location.postcode.length)
      : ""
  }`
}

export function phoneFormatString(phnumber: string) {
  let formatPhnumber: string = phnumber,
    countrycode = "",
    Areacode = "",
    number = ""
  if (phnumber.length <= 10 && phnumber.length > 6) {
    countrycode = phnumber.substring(0, 3)
    Areacode = phnumber.substring(3, 6)
    number = phnumber.substring(6, phnumber.length)
    formatPhnumber = "(" + countrycode + ") " + Areacode + "-" + number
  } else if (phnumber.length > 10) {
    countrycode = phnumber.substring(phnumber.length - 10, phnumber.length - 7)
    Areacode = phnumber.substring(phnumber.length - 7, phnumber.length - 4)
    number = phnumber.substring(phnumber.length - 4, phnumber.length)
    formatPhnumber =
      phnumber.substring(0, phnumber.length - 10) +
      " (" +
      countrycode +
      ") " +
      Areacode +
      "-" +
      number
  }
  return formatPhnumber
}

export function getHourType(hourStr: string) {
  if (!hourStr) return "12:00 a.m"
  const ptr = hourStr.split(":")
  let hour = 12,
    minute = "00",
    AP = "a.m."
  if (ptr.length > 0) {
    hour = parseInt(ptr[0])
    if (hour >= 12) {
      AP = "p.m."
    } else {
      AP = "a.m."
    }
  }
  if (ptr.length > 1) {
    minute = ptr[1]
  }
  return `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${AP}`
}

export function isPassedTime(hourStr: string) {
  if (!hourStr) return true

  const today = new Date(),
    y = today.getFullYear(),
    m = today.getMonth(),
    d = today.getDate()
  const ptr = hourStr.split(":")

  let h = 12,
    min = 0
  if (ptr.length > 0) h = Number(ptr[0])
  if (ptr.length > 1) min = Number(ptr[1])

  const cntStamp = new Date(y, m, d, h, min).getTime()

  return cntStamp < new Date().getTime()
}

const formatHHMM = (val: number) => {
  if (val < 10) {
    return `0${val}`
  } else {
    return val.toString()
  }
}

export function getConvertHourType(
  hour: string,
  defaultTz: string | undefined,
  convertTz: string | null
) {
  if (!defaultTz || !convertTz || !hour) {
    return getHourType(hour)
  }
  const defaultOffset = moment().tz(defaultTz).utcOffset() / 60,
    convertOffset = moment().tz(convertTz).utcOffset() / 60,
    diff = convertOffset - defaultOffset,
    ptr = hour.split(":"),
    convertedMin = (diff + Number(ptr[0])) * 60 + Number(ptr[1])
  if (convertedMin <= 0 || convertedMin >= 1440) {
    return getHourType(hour)
  }
  const newHour = `${formatHHMM(Math.floor(convertedMin / 60))}:${formatHHMM(convertedMin % 60)}`
  return getHourType(newHour)
}

export function getRegularHours(hours: LocationHoursParam[]) {
  return hours
    .map((v) => v)
    .filter((p) => {
      return p.type == "REGULAR"
    })
    .sort((d) => d.day)
}

export function getCloseTime(hours: LocationHoursParam[], type: string) {
  let closeTime = ""

  for (let i = 0; i < hours.length; i++) {
    if (hours[i].type === type && hours[i].close && hours[i].open) {
      closeTime = hours[i].close
      break
    }
  }

  hours.forEach((item) => {
    if (item.type === "REGULAR" && item.close && item.open && compareTimes(closeTime, item.close)) {
      closeTime = item.close
    }
  })
  return closeTime
}

function compareTimes(time1: string, time2: string) {
  if (!time1 || !time2) return false
  const regex = new RegExp(":", "g")
  if (parseInt(time1.replace(regex, ""), 10) < parseInt(time2.replace(regex, ""), 10)) {
    return true
  } else {
    return false
  }
}

export function formatCountryName(countryCode: string) {
  if (countryCode === "CA") {
    return "Canada"
  } else if (countryCode === "US") {
    return "United States"
  } else {
    return ""
  }
}

export function formatAddress(address_1: string, address_2: string | null) {
  if (!address_2) {
    return address_1
  } else {
    return `${address_1}, ${address_2}`
  }
}

export function formatWarranty(warranty: number | null, warranty_unit: string | null) {
  let unit = "month"
  if (warranty_unit === "MONTH") {
    unit = "month"
  } else if (warranty_unit === "DAY") {
    unit = "day"
  } else if (warranty_unit === "YEAR") {
    unit = "year"
  } else {
    unit = "lifetime"
  }

  if (!warranty || !warranty_unit) {
    return ""
  } else {
    if (unit !== "lifetime" && warranty > 1) {
      unit += "s"
    }
    return `${warranty} ${unit}`
  }
}

export function getWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  }
  return 0
}

export function getScore(data: VendorProfileReviewsParam[]) {
  let score = 0
  if (data.length) {
    data.forEach((item: VendorProfileReviewsParam) => {
      score += item.score
    })
    score = score / data.length
  }
  return score
}

export function findCommonElement(array1: number[], array2: ProductCategoryParam[] | undefined) {
  if (!array2) return false
  return array2.some((item) => array1.includes(item.category_id))
}

export function RangeOfStorage(
  storage: number,
  storage_list: FilterCheckItemParam[],
  checkedStorage: number[]
) {
  let result = false
  checkedStorage.forEach((item) => {
    const itIndex = _.findIndex(storage_list, { id: item })
    if (itIndex > -1) {
      if (storage_list[itIndex].value <= storage) {
        result = true
        return
      }
    }
  })
  return result
}

export function CheckAvailable(
  checkedAvailabilities: number[],
  AVAILABILITIES: FilterCheckItemParam[],
  item: ProductParam
) {
  let result = false
  checkedAvailabilities.forEach((it) => {
    const itIndex = _.findIndex(AVAILABILITIES, { id: it })
    if (itIndex > -1) {
      if (AVAILABILITIES[itIndex].id === 1 && item.available_online) {
        result = true
        return
      } else if (AVAILABILITIES[itIndex].id === 2 && item.available_in_store) {
        result = true
        return
      }
    }
  })
  return result
}

export function formatAsMoney(val: number | undefined) {
  if (!val) return "$0.00"
  return val.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

export const formatCardNumber = (value: string) => {
  if (!value) return value
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
  const onlyNumbers = value.replace(/[^\d]/g, "")

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(" ")
  )
}

export const formatExpiryDate = (value: string) => {
  if (!value) return value
  const regex = /^(\d{0,2})(\d{0,2})$/g
  const onlyNumbers = value.replace(/[^\d.-]/g, "")

  return onlyNumbers.replace(regex, (regex, $1, $2) =>
    [$1, $2].filter((group) => !!group).join("/")
  )
}
