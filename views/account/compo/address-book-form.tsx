import React, { useEffect, useState } from "react"
import { Form, Formik, FormikHelpers } from "formik"
import {
  FormGroup,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@material-ui/core"
import * as Yup from "yup"
import { observer } from "mobx-react"
import { shopStore } from "../../../store"
import {
  AddressParam,
  AddressKeyParam,
  AddressTypeParam,
} from "../../../models/customer-data-params"
import countriesData from "../../../const/countriesData"
import statesData from "../../../const/statesData"
import { useTranslation } from "react-i18next"
import _, { isEmpty } from "lodash"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"

type Props = {
  states: any[]
  editAddressType: number | AddressTypeParam
  addStatus: boolean
  setStates: (val: any[]) => void
  setEditAddressType: (val: number | AddressTypeParam) => void
  setAddStatus: (val: boolean) => void
  setToastParams: (val: ToastMsgParams) => void
  inputAddressStatus?: boolean
  editAddress: AddressParam
}

const AddressBookForm = React.forwardRef(
  (
    {
      states,
      editAddressType,
      addStatus,
      setStates,
      setEditAddressType,
      setToastParams,
      setAddStatus,
      inputAddressStatus,
      editAddress,
    }: Props,
    ref: any
  ) => {
    const [t] = useTranslation()
    const delayTime = 2000
    const initialValues = {} as AddressParam

    const [selectedAddress, setSelectedAddress] = useState<AddressParam>({} as AddressParam)
    const [billing, setBilling] = useState(false)
    const [shipping, setShipping] = useState(false)
    const [filteredAddresses, setFilteredAddresses] = useState<AddressParam[]>([] as AddressParam[])
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
      const newFiltered = [] as AddressParam[],
        allAddresses = _.cloneDeep(shopStore.address_list)
      allAddresses.forEach((item: AddressParam) => {
        if (billing && item.address_type === "BILLING") {
          newFiltered.push(item)
        } else if (shipping && item.address_type === "SHIPPING") {
          newFiltered.push(item)
        }
      })
      if (newFiltered.length) {
        setSelectedAddress(newFiltered[0])
      }
      setFilteredAddresses(newFiltered)
    }, [billing, shipping])

    const addingAddressList = (address: AddressParam) => {
      const cntAddressList = _.cloneDeep(shopStore.address_list)
      const checkIndex = _.findIndex(
        cntAddressList,
        (o) => o.id === address.id && o.address_type === address.address_type
      )
      if (checkIndex < 0) {
        cntAddressList.push(address)
      }
      shopStore.setAddressLists(cntAddressList)
    }

    const handleSaveNewAddress = () => {
      setIsSubmitting(true)
      setTimeout(() => {
        const cntSelAddress = _.cloneDeep(selectedAddress)

        if (billing) {
          cntSelAddress.address_type = "BILLING"
          shopStore.setBillingAddress(_.cloneDeep(cntSelAddress))
          addingAddressList(_.cloneDeep(cntSelAddress))
        }

        if (shipping) {
          cntSelAddress.address_type = "SHIPPING"
          shopStore.setOrderAddress(_.cloneDeep(cntSelAddress))
          addingAddressList(_.cloneDeep(cntSelAddress))
        }

        setIsSubmitting(false)
        setToastParams({
          msg: t("New Address has been added."),
          isSuccess: true,
        })

        setAddStatus(false)
        setEditAddressType(-1)
      }, delayTime)
    }

    useEffect(() => {
      if (editAddressType !== -1) {
        const info = _.cloneDeep(editAddress)
        if (ref.current) {
          ref.current.resetForm({
            values: {
              first_name: info.first_name,
              last_name: info.last_name,
              email: info.email,
              address_1: info.address_1,
              address_2: info.address_2,
              city: info.city,
              state: info.state,
              country: info.country,
              postcode: info.postcode,
              billing: false,
              delivery: false,
            },
          })
          setStates(statesData[info.country])
        }
      } else if (addStatus && inputAddressStatus) {
        if (ref.current) {
          ref.current.resetForm({
            values: {
              address_1: "",
              address_2: "",
              city: "",
              state: statesData["CA"][0].code,
              country: "CA",
              postcode: "",
              billing: true,
              delivery: false,
            },
          })
          setStates(statesData["CA"])
        }
      }
    }, [editAddressType, addStatus])

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

    const onSave = (values: AddressParam, actions: FormikHelpers<any>) => {
      actions.setSubmitting(true)
      let msg = ""
      const isWarning = false

      console.log("values", values)

      const updateAddress = _.cloneDeep(editAddress)
      if (editAddressType !== -1) {
        updateAddress.first_name = values.first_name
        updateAddress.last_name = values.last_name
        updateAddress.email = values.email
        updateAddress.address_1 = values.address_1
        updateAddress.address_2 = values.address_2
        updateAddress.city = values.city
        updateAddress.state = values.state
        updateAddress.postcode = values.postcode
        updateAddress.country = values.country
      } else if (addStatus) {
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

        if (billing) {
          newValues.address_type = "BILLING"
          shopStore.setBillingAddress(_.cloneDeep(newValues))
          addingAddressList(_.cloneDeep(newValues))
        }

        if (shipping) {
          newValues.address_type = "SHIPPING"
          shopStore.setOrderAddress(_.cloneDeep(newValues))
          addingAddressList(_.cloneDeep(newValues))
        }
      }

      setTimeout(() => {
        if (!addStatus) {
          if (editAddressType === "BILLING") {
            shopStore.setBillingAddress(updateAddress)
            msg = `${"Billing Address"} ${t("has been updated successfully.")}`
          } else if (editAddressType === "SHIPPING") {
            shopStore.setOrderAddress(updateAddress)
            msg = `${"Delivery Address"} ${t("has been updated successfully.")}`
          }
          const cntAddressList = _.cloneDeep(shopStore.address_list)
          const addressIndex = _.findIndex(
            cntAddressList,
            (o) => o.id === updateAddress.id && o.address_type === editAddressType
          )
          if (addressIndex > -1) {
            cntAddressList[addressIndex] = updateAddress
          }
          shopStore.setAddressLists(cntAddressList)
        } else if (addStatus) {
          msg = t("New Address has been added.")
        }
        setToastParams({
          msg,
          isSuccess: !isWarning,
          isWarning: isWarning,
        })
        actions.setSubmitting(false)

        setAddStatus(false)
        setEditAddressType(-1)
      }, delayTime)
    }

    const loadStates = (countryCode: string) => {
      setStates(statesData[countryCode])
    }

    const handleSelectAddress = (key: AddressKeyParam, val: string | null) => {
      const selIndex = _.findIndex(filteredAddresses, (o) => o[key] === val)
      if (selIndex > -1) {
        setSelectedAddress(filteredAddresses[selIndex])
      }
    }

    return (
      <>
        {(!addStatus || (addStatus && inputAddressStatus)) && (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              onSave(values, actions)
            }}
            validationSchema={formSchema}
            innerRef={ref}
          >
            {({ values, setFieldValue, errors, touched, isSubmitting }) => (
              <Form className="my-details-form">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label className="my-details-label" htmlFor="first_name">
                      {t("First Name")}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormGroup className="form-group">
                      <TextField
                        id="first_name"
                        name="first_name"
                        InputLabelProps={{ required: false }}
                        value={values.first_name || ""}
                        error={!!(errors.first_name && touched.first_name)}
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("first_name", e.target.value)
                        }}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.first_name && touched.first_name && errors.first_name}
                        disabled={isSubmitting}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <label className="my-details-label" htmlFor="last_name">
                      {t("Last Name")}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormGroup className="form-group">
                      <TextField
                        id="last_name"
                        name="last_name"
                        InputLabelProps={{ required: false }}
                        value={values.last_name || ""}
                        error={!!(errors.last_name && touched.last_name)}
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("last_name", e.target.value)
                        }}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.last_name && touched.last_name && errors.last_name}
                        disabled={isSubmitting}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                <label className="my-details-label" htmlFor="email">
                  {t("Email")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <FormGroup className="form-group">
                  <TextField
                    id="email"
                    name="email"
                    InputLabelProps={{ required: false }}
                    value={values.email || ""}
                    error={!!(errors.email && touched.email)}
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("email", e.target.value)
                    }}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.email && touched.email && errors.email}
                    disabled={isSubmitting || (editAddressType !== -1 && !addStatus)}
                  />
                </FormGroup>

                <label className="my-details-label" htmlFor="address_1">
                  {t("Street Address")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <FormGroup className="form-group">
                  <TextField
                    id="address_1"
                    name="address_1"
                    InputLabelProps={{ required: false }}
                    value={values.address_1 || ""}
                    error={!!(errors.address_1 && touched.address_1)}
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("address_1", e.target.value)
                    }}
                    placeholder={`${t("Enter your street address")}...`}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.address_1 && touched.address_1 && errors.address_1}
                    disabled={isSubmitting}
                    required
                  />
                </FormGroup>

                <label className="my-details-label" htmlFor="address_2">
                  {`${t("Second Address")} (${t("optional")})`}
                </label>
                <FormGroup className="form-group">
                  <TextField
                    id="address_2"
                    name="address_2"
                    InputLabelProps={{ required: false }}
                    value={values.address_2 || ""}
                    error={!!(errors.address_2 && touched.address_2)}
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("address_2", e.target.value)
                    }}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.address_2 && touched.address_2 && errors.address_2}
                    disabled={isSubmitting}
                  />
                </FormGroup>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label className="my-details-label" htmlFor="city">
                      {t("City")}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormGroup className="form-group">
                      <TextField
                        id="city"
                        name="city"
                        InputLabelProps={{ required: false }}
                        value={values.city || ""}
                        error={!!(errors.city && touched.city)}
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("city", e.target.value)
                        }}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.city && touched.city && errors.city}
                        disabled={isSubmitting}
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={6}>
                    <label className="my-details-label" htmlFor="state">
                      {t("Province")}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormGroup className="form-group">
                      <TextField
                        id="state"
                        name="state"
                        InputLabelProps={{ required: false }}
                        value={values.state || ""}
                        error={!!(errors.state && touched.state)}
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("state", e.target.value)
                        }}
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
                            <MenuItem key={state.code} value={state.code} className="select-items">
                              {state.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label className="my-details-label" htmlFor="country">
                      {t("Country")}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormGroup className="form-group">
                      <TextField
                        id="country"
                        name="country"
                        InputLabelProps={{ required: false }}
                        value={values.country || ""}
                        error={!!(errors.country && touched.country)}
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("country", e.target.value)
                          setFieldValue("state", statesData[e.target.value][0].code)
                          loadStates(e.target.value)
                        }}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.country && touched.country && errors.country}
                        autoComplete="off"
                        select
                      >
                        {countriesData.map((c) => (
                          <MenuItem key={c.code} value={c.code} className="select-items">
                            {c.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormGroup>
                  </Grid>

                  <Grid item xs={6}>
                    <label className="my-details-label" htmlFor="postcode">
                      {t("Postal Code")}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <FormGroup className="form-group">
                      <TextField
                        id="postcode"
                        name="postcode"
                        InputLabelProps={{ required: false }}
                        value={values.postcode || ""}
                        error={!!(errors.postcode && touched.postcode)}
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("postcode", e.target.value)
                        }}
                        type="text"
                        variant="outlined"
                        margin="dense"
                        helperText={errors.postcode && touched.postcode && errors.postcode}
                        disabled={isSubmitting}
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                {addStatus && (
                  <FormControl component="fieldset" style={{ margin: 0, padding: "20px 10px" }}>
                    <FormGroup>
                      {isEmpty(shopStore.billingAddress) && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={billing}
                              onChange={(e) => {
                                setBilling(e.target.checked)
                              }}
                              name="billing"
                              color="primary"
                            />
                          }
                          label={t("Billing Address")}
                        />
                      )}
                      {isEmpty(shopStore.orderAddress) && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={shipping}
                              onChange={(e) => {
                                setShipping(e.target.checked)
                              }}
                              name="delivery"
                              color="primary"
                            />
                          }
                          label={t("Delivery Address")}
                        />
                      )}
                    </FormGroup>
                  </FormControl>
                )}

                <button className="icon-button" type="submit" disabled={isSubmitting}>
                  <span>
                    {!isSubmitting ? (
                      <img src="/img/icons/save-blue.png" alt="save-blue" />
                    ) : (
                      <img src="/img/icons/save-grey.png" alt="save-grey" />
                    )}
                  </span>
                </button>
              </Form>
            )}
          </Formik>
        )}

        {addStatus && !inputAddressStatus && (
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
                {filteredAddresses.map((item: AddressParam, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.address_1}
                  </MenuItem>
                ))}
              </TextField>
            </FormGroup>

            <FormControl component="fieldset" style={{ margin: 0, padding: "20px 10px" }}>
              <FormGroup>
                {isEmpty(shopStore.billingAddress) && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={billing}
                        onChange={(e) => {
                          setBilling(e.target.checked)
                        }}
                        name="billing"
                        color="primary"
                      />
                    }
                    label={t("Billing Address")}
                  />
                )}
                {isEmpty(shopStore.orderAddress) && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={shipping}
                        onChange={(e) => {
                          setShipping(e.target.checked)
                        }}
                        name="shipping"
                        color="primary"
                      />
                    }
                    label={t("Delivery Address")}
                  />
                )}
              </FormGroup>
            </FormControl>

            <button className="icon-button" type="button" onClick={handleSaveNewAddress}>
              <span>
                {!isSubmitting ? (
                  <img src="/img/icons/save-blue.png" alt="save-blue" />
                ) : (
                  <img src="/img/icons/save-grey.png" alt="save-grey" />
                )}
              </span>
            </button>
          </>
        )}
      </>
    )
  }
)

export default observer(AddressBookForm)
