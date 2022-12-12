const WORKS_WITH = [
  {
    id: 1,
    name: "unlocked",
    img_src: "",
  },
  {
    id: 2,
    name: "rogers",
    img_src: "/img/product/work-with/rogers.png",
  },
  {
    id: 3,
    name: "bell",
    img_src: "/img/product/work-with/bell.png",
  },
  {
    id: 4,
    name: "telus",
    img_src: "/img/product/work-with/telus.png",
  },
  {
    id: 5,
    name: "koodo",
    img_src: "/img/product/work-with/koodo.png",
  },
  {
    id: 6,
    name: "fido",
    img_src: "/img/product/work-with/fido.png",
  },
  {
    id: 7,
    name: "virqin",
    img_src: "/img/product/work-with/virqin.png",
  },
]

const PRODUCT_COLORS = [
  {
    id: 1,
    color: "#980110",
  },
  {
    id: 2,
    color: "#28BC83",
  },
  {
    id: 3,
    color: "#ffffff",
  },
]

const PRODUCT_STORAGES = [
  {
    id: 1,
    value: 64,
  },
  {
    id: 2,
    value: 128,
  },
]

const PRODUCT_CONDITIONS = [
  {
    id: 1,
    name: "new",
    code: "NEW",
    availability: false,
    cost: 820,
  },
  {
    id: 2,
    name: "mint",
    code: "MINT",
    availability: true,
    cost: 675,
  },
  {
    id: 3,
    name: "good",
    code: "GOOD",
    availability: true,
    cost: 529,
  },
  {
    id: 4,
    name: "fair",
    code: "FAIR",
    availability: false,
    cost: 435,
  },
]

const PRODUCT_WARRANTY_OPTIONS = [
  {
    label: "12 Month Warranty",
    value: 12,
  },
  {
    label: "6 Month Warranty",
    value: 6,
  },
]

const SIMILAR_PRODUCTS = [
  {
    id: 1,
    store_id: 1,
    brand_id: 1,
    name: "iPhone SE 2020",
    img_src: "/img/product/screens/iphone-11.png",
    img_alt: "iphone-11-pro",
    short_description: "$50/mo",
    description: "64 GB | White",
    storage: 128,
    supplier_id: 1,
    esthetic_id: 1,
    carrier_id: 1,
    color_id: 6,
    color: "Midnight Green",
    require_stock: true,
    cost: 897,
    included_warranty_duration_month: 12,
    sort_order: 1,
    available_in_store: true,
    available_online: false,
  },
  {
    id: 2,
    store_id: 1,
    brand_id: 1,
    name: "iPhone SE 2020",
    img_src: "/img/product/screens/iphone-11.png",
    img_alt: "iphone-11-pro",
    short_description: "$50/mo",
    description: "64 GB | White",
    storage: 128,
    supplier_id: 1,
    esthetic_id: 1,
    carrier_id: 1,
    color_id: 6,
    color: "Midnight Green",
    require_stock: true,
    cost: 897,
    included_warranty_duration_month: 12,
    sort_order: 1,
    available_in_store: false,
    available_online: true,
  },
  {
    id: 3,
    store_id: 1,
    brand_id: 1,
    name: "iPhone SE 2020",
    img_src: "/img/product/screens/iphone-11.png",
    img_alt: "iphone-11-pro",
    short_description: "$50/mo",
    description: "64 GB | White",
    storage: 128,
    supplier_id: 1,
    esthetic_id: 1,
    carrier_id: 1,
    color_id: 6,
    color: "Midnight Green",
    require_stock: true,
    cost: 897,
    included_warranty_duration_month: 12,
    sort_order: 1,
    available_in_store: true,
    available_online: true,
  },
]

const QUALITY_GRADINGS = [
  {
    id: 1,
    name: "Mint",
    abstract:
      "Perfect aesthetics, product intact New or fully functioning battery 12 month warranty",
    description:
      "Refurbished device in excellent condition. The device shell is intact and without any flaws. The screen shows no wear. The battery is new or like new. When you buy a refurbished device, it comes with a DeviceKit (new charger and SIM extractor). This mobile is guaranteed for 12 months by DeviceList.",
    data: [
      {
        name: "Perfect Aesthetics",
        img_src: "/img/product/quality-grading/perfect-aesthetics.png",
      },
      {
        name: "Optimal Battery",
        img_src: "/img/product/quality-grading/optimal-battery.png",
      },
      {
        name: "12 Month Warranty",
        img_src: "/img/product/quality-grading/month-warranty.png",
      },
    ],
    preview: {
      front: "/img/product/quality-grading/front.png",
      back: "/img/product/quality-grading/back.png",
    },
  },
  {
    id: 2,
    name: "Good",
    abstract: "Light micro scratches New or fully functioning battery 12 month warranty",
    description:
      "Refurbished device in excellent condition. The device shell is intact and without any flaws. The screen shows no wear. The battery is new or like new. When you buy a refurbished device, it comes with a DeviceKit (new charger and SIM extractor). This mobile is guaranteed for 12 months by DeviceList.",
    data: [
      {
        name: "Perfect Aesthetics",
        img_src: "/img/product/quality-grading/perfect-aesthetics.png",
      },
      {
        name: "Optimal Battery",
        img_src: "/img/product/quality-grading/optimal-battery.png",
      },
      {
        name: "12 Month Warranty",
        img_src: "/img/product/quality-grading/month-warranty.png",
      },
    ],
    preview: {
      front: "/img/product/quality-grading/front.png",
      back: "/img/product/quality-grading/back.png",
    },
  },
  {
    id: 3,
    name: "Fair",
    abstract:
      "Impacts on the shell and fine scratches New or fully functioning battery 12 month warranty",
    description:
      "Refurbished device in excellent condition. The device shell is intact and without any flaws. The screen shows no wear. The battery is new or like new. When you buy a refurbished device, it comes with a DeviceKit (new charger and SIM extractor). This mobile is guaranteed for 12 months by DeviceList.",
    data: [
      {
        name: "Perfect Aesthetics",
        img_src: "/img/product/quality-grading/perfect-aesthetics.png",
      },
      {
        name: "Optimal Battery",
        img_src: "/img/product/quality-grading/optimal-battery.png",
      },
      {
        name: "12 Month Warranty",
        img_src: "/img/product/quality-grading/month-warranty.png",
      },
    ],
    preview: {
      front: "/img/product/quality-grading/front.png",
      back: "/img/product/quality-grading/back.png",
    },
  },
]

const GRADING_PREVIEW = {
  front: "FRONT",
  back: "BACK",
}

const PRODUCT_FAQS = [
  {
    id: 1,
    question: "What condition will the battery be in?",
    answers: [
      {
        text: "Each  battery is inspected and tested to make sure it reaches at least 80% of its initial charging capacity or more. If it does not meet this standard, the battery is automatically replaced by a new one. In case you’re not satisfied with your battery’s performance you can make good use of our (included) 12 month warranty.",
        link: null,
      },
    ],
  },
  {
    id: 2,
    question: "What does your 12 month warranty cover and how does it work?",
    answers: [
      {
        text: "Our 12 month warranty comes free with the sale of every device sold on DeviceList. This warranty covers malfunctions or defects that aren’t caused by damage or misuse by the user. The warranty covers loose or weak battery, buttons that sink, a faulty touch screen, and more. The warranty does not cover: software issues, water damage, accidental damage, broken or smashed LCD, and pixel loss. If the device is dropped and breaks, the warranty will not apply.",
        link: null,
      },
      {
        text: "How to use the warranty: 1) if you have an issue with your device, log into your DeviceList account 2) Once logged In click on the My Dashboard, then click on RMA Requests 3) The return system will guide you on how to process your return.",
        link: null,
      },
    ],
  },
  {
    id: 3,
    question: "How long will it take to get my package?",
    answers: [
      {
        text: "Purolator Ground typically takes 1-5 Business days depending on your area. Purolator Express typically takes 1-2 business days depending on your area.",
        link: null,
      },
    ],
  },
  {
    id: 4,
    question: "Who are the verified sellers?",
    answers: [
      {
        text: "DeviceList’s verified seller network consists of the leading movile device resellers and refurbshers across Canada. Our verified sellers continue to pass regular audits and monthly inspections conducted by our team. We do this to ensure and maintain the highest quality standard when it comes to device procurement.",
        link: null,
      },
      {
        text: "DeviceList continues to expand its qualified sellers across Cana through a rigorous verification process. If you are a seller and would like to join our network, then please",
        link: {
          text: "click here",
          href: "#",
        },
      },
    ],
  },
  {
    id: 5,
    question: "How does device financing work?",
    answers: [
      {
        text: "Our partnership with Flexiti allows us to offer you a seamless checkout experience on new and used device financing. We run a 60 second credit check to show you payment pla options by Flexiti. Flexiti has many payment plan options that you can pick from such as 6, 12, 24 months based on your credit. For more info on Flexiti visit our",
        link: {
          text: "financing page",
          href: "#",
        },
      },
    ],
  },
]

export {
  WORKS_WITH,
  PRODUCT_COLORS,
  PRODUCT_STORAGES,
  PRODUCT_CONDITIONS,
  PRODUCT_WARRANTY_OPTIONS,
  SIMILAR_PRODUCTS,
  QUALITY_GRADINGS,
  GRADING_PREVIEW,
  PRODUCT_FAQS,
}
