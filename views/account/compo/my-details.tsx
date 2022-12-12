import React, { useState } from "react"
import { observer } from "mobx-react"
import { authStore } from "../../../store"
import { useTranslation } from "react-i18next"
import { Form, Formik, FormikHelpers } from "formik"
import { FormGroup, TextField } from "@material-ui/core"
import * as Yup from "yup"
import _ from "lodash"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"
import Toast from "../../../components/toast/toast"
import DeleteAccount from "../modal/delete-account"

type FormParam = {
  first_name: string
  last_name: string
  email: string
  phone: string
}

const MyDetails = () => {
  const [t] = useTranslation()
  const myInfo = _.cloneDeep(authStore.accountData.myDetails.info)
  const delayTime = 2000

  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const initialValues = {
    first_name: myInfo.first_name,
    last_name: myInfo.last_name,
    email: myInfo.email,
    phone: myInfo.phone,
  }

  const onSave = (values: FormParam, actions: FormikHelpers<any>) => {
    actions.setSubmitting(true)

    const cntAccountData = _.cloneDeep(authStore.accountData),
      cntMockCredential = _.cloneDeep(authStore.mockCredential)
    cntAccountData.myDetails.info = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
    }
    // cntAccountData.addressBook.address.forEach((item) => {
    //   item.info.name = `${values.first_name} ${values.last_name}`
    // })
    authStore.setAccountData(cntAccountData)

    cntMockCredential.first_name = values.first_name
    cntMockCredential.last_name = values.last_name
    authStore.setMockCredential(cntMockCredential)

    setTimeout(() => {
      setToastParams({
        msg: t("Your info has been updated successfully."),
        isSuccess: true,
      })
      setIsEditing(false)
      actions.setSubmitting(false)
    }, delayTime)
  }

  const formSchema = Yup.object().shape({
    first_name: Yup.string().required(t("required")).min(1, t("required")),
    last_name: Yup.string().required(t("required")).min(1, t("required")),
    email: Yup.string().email(t("Invalid email.")).required(t("Email is required.")),
  })

  const resetStatuses = () => {
    setToastParams({
      msg: "",
      isError: false,
      isWarning: false,
      isInfo: false,
      isSuccess: false,
    })
  }

  return (
    <div className="account-details">
      <p className="details-title">{t(authStore.accountData.myDetails.title)}</p>
      <p className="details-content">{t(authStore.accountData.myDetails.content)}</p>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSave(values, actions)
        }}
        validationSchema={formSchema}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="my-details-form">
            <label className="my-details-label" htmlFor="first_name">
              {t("First Name")}:
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
                  setIsEditing(true)
                }}
                placeholder={`${t("Enter your first name")}...`}
                type="text"
                variant="outlined"
                margin="dense"
                helperText={errors.first_name && touched.first_name && errors.first_name}
                disabled={isSubmitting}
                required
              />
            </FormGroup>

            <label className="my-details-label" htmlFor="last_name">
              {t("Last Name")}:
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
                  setIsEditing(true)
                }}
                placeholder={`${t("Enter your last name")}...`}
                type="text"
                variant="outlined"
                margin="dense"
                helperText={errors.last_name && touched.last_name && errors.last_name}
                disabled={isSubmitting}
                required
              />
            </FormGroup>

            <label className="my-details-label" htmlFor="email">
              {t("Email Address")}:
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
                  setIsEditing(true)
                }}
                placeholder={`${t("Enter your email")}...`}
                type="email"
                variant="outlined"
                margin="dense"
                helperText={errors.email && touched.email && errors.email}
                disabled={true}
              />
            </FormGroup>

            <label className="my-details-label" htmlFor="phone">
              {t("Phone Number")}:
            </label>
            <FormGroup className="form-group">
              <TextField
                id="phone"
                name="phone"
                InputLabelProps={{ required: false }}
                value={values.phone || ""}
                error={!!(errors.phone && touched.phone)}
                className="form-control"
                onChange={(e) => {
                  setFieldValue("phone", e.target.value)
                  setIsEditing(true)
                }}
                placeholder={`${t("Enter your phone number")}...`}
                type="text"
                variant="outlined"
                margin="dense"
                helperText={errors.phone && touched.phone && errors.phone}
                disabled={isSubmitting}
              />
            </FormGroup>

            <button className="icon-button" type="submit" disabled={isSubmitting || !isEditing}>
              <span>
                {!isSubmitting && isEditing ? (
                  <img src="/img/icons/save-blue.png" alt="save-blue" />
                ) : (
                  <img src="/img/icons/save-grey.png" alt="save-grey" />
                )}
              </span>
            </button>
          </Form>
        )}
      </Formik>

      <button className="delete-account" onClick={() => setOpenDeleteModal(true)}>
        {t("Delete My Account")}
      </button>
      <DeleteAccount open={openDeleteModal} setOpen={setOpenDeleteModal} />
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default observer(MyDetails)
