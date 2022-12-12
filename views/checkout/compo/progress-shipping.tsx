import React, { useRef, useState, useEffect } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import {
  Grid,
  FormGroup,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@material-ui/core"
import countriesData from "../../../const/countriesData"
import statesData from "../../../const/statesData"
import _, { isEmpty } from "lodash"
import PhoneInput from "../../../components/phone-input"
import {
  SHIPPING_STEP_STATUS,
  SHIPPING_FORM_TITLE,
  DELIVERY_OPTIONS,
  SELECT_LOCATIONS,
  CHECKOUT_PROGRESS_STATUS,
} from "../../../const/_variables"
import { observer } from "mobx-react"
import { shopStore } from "../../../store"
import { formatCountryName, phoneFormatString, formatAsMoney } from "../../../service/hepler"
import EditIcon from "../../../components/svg/edit-svg"
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined"
import { SelectedLocationParam, DeliveryOptionParam } from "../../../models/checkout-params"
import { AddressParam, AddressKeyParam } from "../../../models/customer-data-params"

type Props = {
  shippingStepStatus: string
  setShippingStepStatus: (val: string) => void
}

const ProgressShipping = ({ shippingStepStatus, setShippingStepStatus }: Props) => {
  const [t] = useTranslation()
  const formikRef = useRef<any>()
  const initialValues = {} as AddressParam

  const [states, setStates] = useState<any[]>(statesData["CA"])
  const [phone, setPhone] = useState<string | null>("")
  const [sameAsBillingAddress, setSameAsBillingAddress] = useState(false)
  const [formTitle, setFormTitle] = useState(SHIPPING_FORM_TITLE.order_address)
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptionParam>(
    DELIVERY_OPTIONS.ground.code
  )
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocationParam>(
    SELECT_LOCATIONS[0]
  )
  const [inputAddress, setInputAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<AddressParam>({} as AddressParam)
  const [filteredAddress, setFilteredAddress] = useState<AddressParam[]>([] as AddressParam[])

  useEffect(() => {
    if (
      shippingStepStatus !== SHIPPING_STEP_STATUS.order_address &&
      shippingStepStatus !== SHIPPING_STEP_STATUS.billing_address
    ) {
      return
    }
    setInputAddress(false)
    const availAddress = _filter_address_()
    setFilteredAddress(availAddress)
    if (shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
      if (!isEmpty(shopStore.orderAddress)) {
        setSelectedAddress(_.cloneDeep(shopStore.orderAddress))
      } else if (availAddress.length) {
        setSelectedAddress(availAddress[0])
      }
    } else {
      if (!isEmpty(shopStore.billingAddress)) {
        setSelectedAddress(_.cloneDeep(shopStore.billingAddress))
      } else if (availAddress.length) {
        setSelectedAddress(availAddress[0])
      }
    }
  }, [shippingStepStatus])

  const handleDeliveryOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryOption((event.target as HTMLInputElement).value as DeliveryOptionParam)
  }

  const handleChangeSelectedLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const locID = Number((event.target as HTMLInputElement).value)
    const locIndex = _.findIndex(SELECT_LOCATIONS, { id: locID })
    if (locIndex > -1) {
      setSelectedLocation(SELECT_LOCATIONS[locIndex])
    }
  }

  useEffect(() => {
    if (formikRef.current && inputAddress) {
      if (shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
        formikRef.current.resetForm({
          values: _.cloneDeep(shopStore.orderAddress),
        })
      } else if (shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) {
        formikRef.current.resetForm({
          values: _.cloneDeep(shopStore.billingAddress),
        })
      }
    }
    if (shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
      setFormTitle(SHIPPING_FORM_TITLE.order_address)
      setPhone(shopStore.orderAddress.phone)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) {
      setFormTitle(SHIPPING_FORM_TITLE.billing_address)
      setPhone(shopStore.billingAddress.phone)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.confirm_order_address) {
      setFormTitle(SHIPPING_FORM_TITLE.confirm_order_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.confirm_billing_address) {
      setFormTitle(SHIPPING_FORM_TITLE.confirm_billing_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.delivery_options) {
      setFormTitle(SHIPPING_FORM_TITLE.delivery_options)
    } else {
      setFormTitle("")
    }
  }, [shippingStepStatus])

  const formSchema = Yup.object().shape({
    first_name: Yup.string().required(t("First Name is required.")),
    last_name: Yup.string().required(t("Last Name is required.")),
    email: Yup.string().email(t("Invalid email.")).required(t("Email is required.")),
    address_1: Yup.string().required(t("Address_1 is required.")),
    city: Yup.string().required(t("City is required.")),
    postcode: Yup.string().required(t("Post Code is required.")),
    country: Yup.string().required(t("Country is required.")),
    state: Yup.string().required(t("State is required.")),
  })

  const onSave = (values: AddressParam) => {
    const newValues = _.cloneDeep(values),
      cntAddressList = _.cloneDeep(shopStore.address_list)

    const addressIDList = shopStore.address_list.map((item) => item.id)
    const newAddressID = Math.max(...addressIDList) + 1

    const customerIDList = shopStore.address_list.map((item) => item.customer_id)
    const newCustomerID = Math.max(...customerIDList) + 1

    const checkIndex = _.findIndex(
      cntAddressList,
      (o) =>
        o.first_name === newValues.first_name &&
        o.last_name === newValues.last_name &&
        o.email === newValues.email &&
        o.company === newValues.company &&
        o.address_1 === newValues.address_1 &&
        o.city === newValues.city &&
        o.state === newValues.state &&
        o.country === newValues.country &&
        o.postcode === newValues.postcode
    )

    if (checkIndex > -1) {
      newValues.id = cntAddressList[checkIndex].id
      newValues.customer_id = cntAddressList[checkIndex].customer_id
    } else {
      newValues.id = newAddressID
      newValues.customer_id = newCustomerID
    }

    if (sameAsBillingAddress && shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
      newValues.address_type = "SHIPPING"
      shopStore.setOrderAddress(_.cloneDeep(newValues))
      cntAddressList.push(_.cloneDeep(newValues))

      newValues.address_type = "BILLING"
      shopStore.setBillingAddress(_.cloneDeep(newValues))
      cntAddressList.push(_.cloneDeep(newValues))

      shopStore.setAddressLists(_.uniqWith(cntAddressList, _.isEqual))

      setShippingStepStatus(SHIPPING_STEP_STATUS.confirm_order_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
      newValues.address_type = "SHIPPING"
      shopStore.setOrderAddress(_.cloneDeep(newValues))

      cntAddressList.push(_.cloneDeep(newValues))
      shopStore.setAddressLists(_.uniqWith(cntAddressList, _.isEqual))

      setShippingStepStatus(SHIPPING_STEP_STATUS.billing_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) {
      newValues.address_type = "BILLING"
      shopStore.setBillingAddress(_.cloneDeep(newValues))

      cntAddressList.push(_.cloneDeep(newValues))
      shopStore.setAddressLists(_.uniqWith(cntAddressList, _.isEqual))

      setShippingStepStatus(SHIPPING_STEP_STATUS.confirm_order_address)
    }
  }

  const handleNext = () => {
    if (sameAsBillingAddress && shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
      shopStore.setOrderAddress(selectedAddress)

      const cntSelAddress = _.cloneDeep(selectedAddress)
      cntSelAddress.address_type = "BILLING"
      shopStore.setBillingAddress(cntSelAddress)

      const checkIndex = _.findIndex(
        shopStore.address_list,
        (o) => o.id === selectedAddress.id && o.address_type === "BILLING"
      )
      if (checkIndex < 0) {
        const cntAddressList = _.cloneDeep(shopStore.address_list)
        cntAddressList.push(cntSelAddress)
        shopStore.setAddressLists(cntAddressList)
      }

      setShippingStepStatus(SHIPPING_STEP_STATUS.confirm_order_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
      shopStore.setOrderAddress(selectedAddress)
      setShippingStepStatus(SHIPPING_STEP_STATUS.billing_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) {
      shopStore.setBillingAddress(selectedAddress)
      setShippingStepStatus(SHIPPING_STEP_STATUS.confirm_order_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.confirm_order_address) {
      setShippingStepStatus(SHIPPING_STEP_STATUS.confirm_billing_address)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.confirm_billing_address) {
      setShippingStepStatus(SHIPPING_STEP_STATUS.delivery_options)
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.delivery_options) {
      shopStore.setDeliveryOption(deliveryOption)
      shopStore.setSelectedLocation(selectedLocation)
      shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.payment)
    }
  }

  const loadStates = (countryCode: string) => {
    setStates(statesData[countryCode])
  }

  const _filter_address_ = () => {
    const addresses = _.cloneDeep(shopStore.address_list)
    if (shippingStepStatus === SHIPPING_STEP_STATUS.order_address) {
      return _.filter(addresses, (o) => o.address_type === "SHIPPING")
    } else if (shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) {
      return _.filter(addresses, (o) => o.address_type === "BILLING")
    } else {
      return addresses
    }
  }

  const handleSelectAddress = (key: AddressKeyParam, val: string | null) => {
    const selIndex = _.findIndex(filteredAddress, (o) => o[key] === val)
    if (selIndex > -1) {
      setSelectedAddress(filteredAddress[selIndex])
    }
  }

  return (
    <div className="box-cart left-side-shipping">
      <div className="flex justify-between align-center">
        <p className="bold" style={{ fontSize: "16px" }}>
          {t(formTitle)}
        </p>
        {(shippingStepStatus === SHIPPING_STEP_STATUS.order_address ||
          shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) && (
          <FormControl className="custom-form-control" component="fieldset" style={{ padding: 0 }}>
            <FormGroup className="form-group">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={inputAddress}
                    onChange={(e) => {
                      setInputAddress(e.target.checked)
                    }}
                    name="inputAddress"
                    color="primary"
                  />
                }
                label={t("Input New Address")}
              />
            </FormGroup>
          </FormControl>
        )}
      </div>

      {(shippingStepStatus === SHIPPING_STEP_STATUS.order_address ||
        shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) &&
        !inputAddress && (
          <>
            <FormGroup className="form-group">
              <TextField
                name="id"
                InputLabelProps={{ required: false }}
                value={selectedAddress.id || ""}
                className="shipping-form-control"
                onChange={(e) => {
                  handleSelectAddress("id", e.target.value)
                }}
                type="text"
                variant="outlined"
                margin="dense"
                autoComplete="off"
                select
              >
                {filteredAddress.map((item: AddressParam, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.address_1}
                  </MenuItem>
                ))}
              </TextField>
            </FormGroup>

            {shippingStepStatus === SHIPPING_STEP_STATUS.order_address && (
              <FormControl className="custom-form-control" component="fieldset">
                <FormGroup className="form-group">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sameAsBillingAddress}
                        onChange={(e) => {
                          setSameAsBillingAddress(e.target.checked)
                        }}
                        name="sameAsBillingAddress"
                        color="primary"
                      />
                    }
                    label={t("Same as billing address")}
                  />
                </FormGroup>
              </FormControl>
            )}

            <div className="shipping-form-submit">
              <button type="button" onClick={handleNext}>
                {t("Next")}
              </button>
              <p>{t("or press ENTER")}</p>
            </div>
          </>
        )}

      {(shippingStepStatus === SHIPPING_STEP_STATUS.order_address ||
        shippingStepStatus === SHIPPING_STEP_STATUS.billing_address) &&
        inputAddress && (
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              onSave(values)
            }}
            validationSchema={formSchema}
            innerRef={formikRef}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormGroup className="form-group">
                      <TextField
                        id="first_name"
                        name="first_name"
                        InputLabelProps={{ required: false }}
                        value={values.first_name || ""}
                        error={!!(errors.first_name && touched.first_name)}
                        className="shipping-form-control"
                        onChange={(e) => {
                          setFieldValue("first_name", e.target.value)
                        }}
                        placeholder={t("First Name*")}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.first_name && touched.first_name && errors.first_name}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormGroup className="form-group">
                      <TextField
                        id="last_name"
                        name="last_name"
                        InputLabelProps={{ required: false }}
                        value={values.last_name || ""}
                        error={!!(errors.last_name && touched.last_name)}
                        className="shipping-form-control"
                        onChange={(e) => {
                          setFieldValue("last_name", e.target.value)
                        }}
                        placeholder={t("Last Name*")}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.last_name && touched.last_name && errors.last_name}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <FormGroup className="form-group">
                  <TextField
                    id="email"
                    name="email"
                    InputLabelProps={{ required: false }}
                    value={values.email || ""}
                    error={!!(errors.email && touched.email)}
                    className="shipping-form-control"
                    onChange={(e) => {
                      setFieldValue("email", e.target.value)
                    }}
                    placeholder={t("Email*")}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.email && touched.email && errors.email}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <TextField
                    id="company"
                    name="company"
                    InputLabelProps={{ required: false }}
                    value={values.company || ""}
                    error={!!(errors.company && touched.company)}
                    className="shipping-form-control"
                    onChange={(e) => {
                      setFieldValue("company", e.target.value)
                    }}
                    placeholder={t("Company - optional")}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.company && touched.company && errors.company}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <TextField
                    id="address_1"
                    name="address_1"
                    InputLabelProps={{ required: false }}
                    value={values.address_1 || ""}
                    error={!!(errors.address_1 && touched.address_1)}
                    className="shipping-form-control"
                    onChange={(e) => {
                      setFieldValue("address_1", e.target.value)
                    }}
                    placeholder={t("Address (number and name)")}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.address_1 && touched.address_1 && errors.address_1}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <TextField
                    id="address_2"
                    name="address_2"
                    InputLabelProps={{ required: false }}
                    value={values.address_2 || ""}
                    error={!!(errors.address_2 && touched.address_2)}
                    className="shipping-form-control"
                    onChange={(e) => {
                      setFieldValue("address_2", e.target.value)
                    }}
                    placeholder={t("Address 2 (building, code ...) - optional")}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.address_2 && touched.address_2 && errors.address_2}
                  />
                </FormGroup>

                <FormGroup className="form-group">
                  <TextField
                    id="city"
                    name="city"
                    InputLabelProps={{ required: false }}
                    value={values.city || ""}
                    error={!!(errors.city && touched.city)}
                    className="shipping-form-control"
                    onChange={(e) => {
                      setFieldValue("city", e.target.value)
                    }}
                    placeholder={t("City")}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.city && touched.city && errors.city}
                  />
                </FormGroup>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormGroup className="form-group">
                      <TextField
                        id="postcode"
                        name="postcode"
                        InputLabelProps={{ required: false }}
                        value={values.postcode || ""}
                        error={!!(errors.postcode && touched.postcode)}
                        className="shipping-form-control"
                        onChange={(e) => {
                          setFieldValue("postcode", e.target.value)
                        }}
                        placeholder={t("Postal Code")}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.postcode && touched.postcode && errors.postcode}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormGroup className="form-group">
                      <TextField
                        id="country"
                        name="country"
                        InputLabelProps={{ required: false }}
                        value={values.country || ""}
                        error={!!(errors.country && touched.country)}
                        className="shipping-form-control"
                        onChange={(e) => {
                          setFieldValue("country", e.target.value)
                          setFieldValue("state", statesData[e.target.value][0].code)
                          loadStates(e.target.value)
                        }}
                        placeholder={t("Country")}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.country && touched.country && errors.country}
                        autoComplete="off"
                        select
                      >
                        {countriesData.map((c) => (
                          <MenuItem key={c.code} value={c.code}>
                            {c.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormGroup>
                  </Grid>
                </Grid>

                <FormGroup className="form-group">
                  <TextField
                    id="state"
                    name="state"
                    InputLabelProps={{ required: false }}
                    value={values.state || ""}
                    error={!!(errors.state && touched.state)}
                    className="shipping-form-control"
                    onChange={(e) => {
                      setFieldValue("state", e.target.value)
                    }}
                    placeholder={t("State / Province / Region")}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.state && touched.state && errors.state}
                    autoComplete="off"
                    select
                  >
                    {states.length &&
                      !isEmpty(states) &&
                      states.map((state: { [key: string]: string }) => (
                        <MenuItem key={state.code} value={state.code}>
                          {state.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </FormGroup>

                <FormGroup className="form-group">
                  <PhoneInput
                    handleSetPhone={(val) => {
                      setFieldValue("phone", val)
                      setPhone(val)
                    }}
                    val={phone}
                    placeholder={t("Phone Number")}
                    label={t("We need it for the delivery, just in case we need to reach you.")}
                  />
                </FormGroup>

                {shippingStepStatus === SHIPPING_STEP_STATUS.order_address && (
                  <FormControl className="custom-form-control" component="fieldset">
                    <FormGroup className="form-group">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={sameAsBillingAddress}
                            onChange={(e) => {
                              setSameAsBillingAddress(e.target.checked)
                            }}
                            name="sameAsBillingAddress"
                            color="primary"
                          />
                        }
                        label={t("Same as billing address")}
                      />
                    </FormGroup>
                  </FormControl>
                )}

                <div className="shipping-form-submit">
                  <button type="submit">{t("Next")}</button>
                  <p>{t("or press ENTER")}</p>
                </div>
              </Form>
            )}
          </Formik>
        )}

      {(shippingStepStatus === SHIPPING_STEP_STATUS.confirm_order_address ||
        shippingStepStatus === SHIPPING_STEP_STATUS.confirm_billing_address) && (
        <>
          <p className="registered-address-label">
            {t("Here's the last address registered on DeviceList")}:
          </p>

          {shippingStepStatus === SHIPPING_STEP_STATUS.confirm_order_address && (
            <div className="confirm-address-form">
              <p
                className="change-address"
                onClick={() => {
                  setShippingStepStatus(SHIPPING_STEP_STATUS.order_address)
                }}
              >
                {t("Change Address")}
                <span>
                  <EditIcon />
                </span>
              </p>
              <p>{`${shopStore.orderAddress.first_name} ${shopStore.orderAddress.last_name}`}</p>
              <p>{shopStore.orderAddress.address_1}</p>
              {shopStore.orderAddress.address_2 && <p>{shopStore.orderAddress.address_2}</p>}
              <p>{`${shopStore.orderAddress.postcode}, ${shopStore.orderAddress.city}, ${shopStore.orderAddress.state}`}</p>
              <p>{formatCountryName(shopStore.orderAddress.country)}</p>
              {shopStore.orderAddress.phone && (
                <p className="flex align-center">
                  <span>
                    <PhoneOutlinedIcon />
                  </span>
                  {phoneFormatString(shopStore.orderAddress.phone)}
                </p>
              )}
            </div>
          )}

          {shippingStepStatus === SHIPPING_STEP_STATUS.confirm_billing_address && (
            <div className="confirm-address-form">
              <p
                className="change-address"
                onClick={() => {
                  setShippingStepStatus(SHIPPING_STEP_STATUS.billing_address)
                }}
              >
                {t("Change Address")}
                <span>
                  <EditIcon />
                </span>
              </p>
              <p>{`${shopStore.billingAddress.first_name} ${shopStore.billingAddress.last_name}`}</p>
              <p>{shopStore.billingAddress.address_1}</p>
              {shopStore.billingAddress.address_2 && <p>{shopStore.billingAddress.address_2}</p>}
              <p>{`${shopStore.billingAddress.postcode}, ${shopStore.billingAddress.city}, ${shopStore.billingAddress.state}`}</p>
              <p>{formatCountryName(shopStore.billingAddress.country)}</p>
              {shopStore.billingAddress.phone && (
                <p className="flex align-center">
                  <span>
                    <PhoneOutlinedIcon />
                  </span>
                  {phoneFormatString(shopStore.billingAddress.phone)}
                </p>
              )}
            </div>
          )}

          <div className="shipping-form-submit">
            <button type="button" onClick={handleNext}>
              {t("Next")}
            </button>
            <p>{t("or press ENTER")}</p>
          </div>
        </>
      )}

      {shippingStepStatus === SHIPPING_STEP_STATUS.delivery_options && (
        <>
          <RadioGroup
            aria-label="delivery-options"
            name="delivery-options"
            value={deliveryOption}
            onChange={handleDeliveryOptionChange}
            className="customize-radio-group"
          >
            <div>
              <FormControlLabel
                value={DELIVERY_OPTIONS.ground.code}
                control={<Radio />}
                label={
                  <span className="radio-span">
                    <img src="/img/icons/purolator.png" alt="purolator" />
                    <p>{t(DELIVERY_OPTIONS.ground.text)}</p>
                  </span>
                }
              />
              <p>{formatAsMoney(DELIVERY_OPTIONS.ground.cost)}</p>
            </div>

            <div>
              <FormControlLabel
                value={DELIVERY_OPTIONS.express.code}
                control={<Radio />}
                label={
                  <span className="radio-span">
                    <img src="/img/icons/purolator.png" alt="purolator" />
                    <p>{t(DELIVERY_OPTIONS.express.text)}</p>
                  </span>
                }
              />
              <p>{formatAsMoney(DELIVERY_OPTIONS.express.cost)}</p>
            </div>

            <div style={{ paddingBottom: "8px" }}>
              <FormControlLabel
                value={DELIVERY_OPTIONS.pick_up.code}
                control={<Radio />}
                label={t(DELIVERY_OPTIONS.pick_up.text)}
              />
              <p>{t(DELIVERY_OPTIONS.pick_up.cost)}</p>
            </div>
          </RadioGroup>

          {deliveryOption === DELIVERY_OPTIONS.pick_up.code && (
            <div className="radio-select-location">
              <p>{t("Select Location")}</p>
              <RadioGroup
                aria-label="select-locations"
                name="select-locations"
                value={selectedLocation.id}
                onChange={handleChangeSelectedLocation}
                className="customize-radio-group"
                style={{ marginTop: "5px" }}
              >
                {SELECT_LOCATIONS.map((item: SelectedLocationParam, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.id}
                      control={<Radio />}
                      label={item.address}
                    />
                  )
                })}
              </RadioGroup>
            </div>
          )}

          <div className="shipping-form-submit">
            <button type="button" onClick={handleNext}>
              {t("Next")}
            </button>
            <p>{t("or press ENTER")}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default observer(ProgressShipping)
