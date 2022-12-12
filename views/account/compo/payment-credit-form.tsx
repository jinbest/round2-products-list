import React, { useEffect } from "react"
import { Form, Formik, FormikHelpers } from "formik"
import { FormGroup, TextField, Grid } from "@material-ui/core"
import * as Yup from "yup"
import { observer } from "mobx-react"
import { authStore } from "../../../store"
import { PaymentCardInfoParam, PaymentParam } from "../../../models/account-param"
import { useTranslation } from "react-i18next"
import _ from "lodash"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"
import { PaymentOptions, PaymentLogos } from "../../../static/mock/mock-data"
import { regxCVV, regxExpiry, regxCardNumber } from "../../../const/_variables"

type Props = {
  editIndex: number
  addStatus: boolean
  setEditIndex: (val: number) => void
  setAddStatus: (val: boolean) => void
  setToastParams: (val: ToastMsgParams) => void
}

const PaymentCreditForm = React.forwardRef(
  ({ editIndex, addStatus, setEditIndex, setToastParams, setAddStatus }: Props, ref: any) => {
    const [t] = useTranslation()
    const delayTime = 2000
    const initialValues = {} as PaymentCardInfoParam

    useEffect(() => {
      if (editIndex > -1) {
        const cardInfo = _.cloneDeep(
          authStore.accountData.paymentMethods.payments[editIndex].cardInfo
        )
        if (ref.current) {
          ref.current.resetForm({
            values: {
              name: cardInfo.name,
              number: cardInfo.number,
              expiryDate: cardInfo.expiryDate,
              cvv: cardInfo.cvv,
            },
          })
        }
      } else if (addStatus) {
        if (ref.current) {
          ref.current.resetForm({
            values: {
              name: "",
              number: "",
              expiryDate: "",
              cvv: "",
            },
          })
        }
      }
    }, [editIndex, addStatus])

    const formSchema = Yup.object().shape({
      name: Yup.string().required(t("required")).min(1, t("required")),
      number: Yup.string().required(t("required")).min(16, t("required")),
      expiryDate: Yup.string().required(t("required")).min(1, t("required")),
      cvv: Yup.string().required(t("required")).min(3, t("required")),
    })

    const onSave = (values: PaymentCardInfoParam, actions: FormikHelpers<any>) => {
      actions.setSubmitting(true)
      let msg = ""

      const cntAccountData = _.cloneDeep(authStore.accountData)
      if (editIndex > -1) {
        cntAccountData.paymentMethods.payments[editIndex].cardInfo = values
      } else if (addStatus) {
        cntAccountData.paymentMethods.payments.push({
          type: PaymentOptions.credit,
          name: "Credit Card",
          logos: PaymentLogos.credit,
          cardInfo: values,
        } as PaymentParam)
      }

      setTimeout(() => {
        authStore.setAccountData(cntAccountData)
        if (editIndex > -1) {
          msg = `${t("Credit Card")} ${t("has been updated successfully.")}`
        } else if (addStatus) {
          msg = t("New Payment method has been added.")
        }
        setToastParams({
          msg,
          isSuccess: true,
        })
        actions.setSubmitting(false)
        setAddStatus(false)
        setEditIndex(-1)
      }, delayTime)
    }

    return (
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
            <label className="my-details-label" htmlFor="name">
              {t("Name on Card")}
              <span style={{ color: "red" }}>*</span>
            </label>
            <FormGroup className="form-group">
              <TextField
                id="name"
                name="name"
                InputLabelProps={{ required: false }}
                value={values.name || ""}
                error={!!(errors.name && touched.name)}
                className="form-control"
                onChange={(e) => {
                  setFieldValue("name", e.target.value)
                }}
                placeholder={`${t("Enter your Credit Card name")}...`}
                type="text"
                variant="outlined"
                margin="dense"
                helperText={errors.name && touched.name && errors.name}
                disabled={isSubmitting}
                required
              />
            </FormGroup>

            <label className="my-details-label" htmlFor="number">
              {t("Card Number")}
              <span style={{ color: "red" }}>*</span>
            </label>
            <FormGroup className="form-group">
              <TextField
                id="number"
                name="number"
                InputLabelProps={{ required: false }}
                value={values.number || ""}
                error={!!(errors.number && touched.number)}
                className="form-control"
                onChange={(e) => {
                  if (regxCardNumber.test(e.target.value)) {
                    setFieldValue("number", e.target.value)
                  } else {
                    return
                  }
                }}
                type="text"
                variant="outlined"
                margin="dense"
                helperText={errors.number && touched.number && errors.number}
                disabled={isSubmitting}
              />
            </FormGroup>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <label className="my-details-label" htmlFor="expiryDate">
                  {t("Expiry Date")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <FormGroup className="form-group">
                  <TextField
                    id="expiryDate"
                    name="expiryDate"
                    InputLabelProps={{ required: false }}
                    value={values.expiryDate || ""}
                    error={!!(errors.expiryDate && touched.expiryDate)}
                    className="form-control"
                    onChange={(e) => {
                      if (regxExpiry.test(e.target.value)) {
                        setFieldValue("expiryDate", e.target.value)
                      } else {
                        return
                      }
                    }}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.expiryDate && touched.expiryDate && errors.expiryDate}
                    disabled={isSubmitting}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <label className="my-details-label" htmlFor="cvv">
                  {t("CVV")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <FormGroup className="form-group">
                  <TextField
                    id="cvv"
                    name="cvv"
                    InputLabelProps={{ required: false }}
                    value={values.cvv || ""}
                    error={!!(errors.cvv && touched.cvv)}
                    className="form-control"
                    onChange={(e) => {
                      if (regxCVV.test(e.target.value)) {
                        setFieldValue("cvv", e.target.value)
                      } else {
                        return
                      }
                    }}
                    type="text"
                    variant="outlined"
                    margin="dense"
                    helperText={errors.cvv && touched.cvv && errors.cvv}
                    disabled={isSubmitting}
                  />
                </FormGroup>
              </Grid>
            </Grid>

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
    )
  }
)

export default observer(PaymentCreditForm)
