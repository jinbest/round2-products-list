import React, { useState } from "react"
import { observer } from "mobx-react"
import { authStore } from "../../../store"
import { useTranslation } from "react-i18next"
import { Form, Formik, FormikHelpers } from "formik"
import { FormGroup, FormControlLabel, Checkbox, FormControl } from "@material-ui/core"
import _ from "lodash"
import { ToastMsgParams } from "../../../components/toast/toast-msg-params"
import Toast from "../../../components/toast/toast"

type FormParam = {
  discount: boolean
  newStock: boolean
  rewards: boolean
  newsletter: boolean
}

const ContactPreferences = () => {
  const [t] = useTranslation()
  const preferrence = _.cloneDeep(authStore.accountData.contantPreferences.info)
  const delayTime = 2000

  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [isEditing, setIsEditing] = useState(false)

  const initialValues = {
    discount: preferrence.discount.value,
    newStock: preferrence.newStock.value,
    rewards: preferrence.rewards.value,
    newsletter: preferrence.newsletter.value,
  }

  const onSave = (values: FormParam, actions: FormikHelpers<any>) => {
    actions.setSubmitting(true)

    const cntAccountData = _.cloneDeep(authStore.accountData)
    cntAccountData.contantPreferences.info.discount.value = values.discount
    cntAccountData.contantPreferences.info.newStock.value = values.newStock
    cntAccountData.contantPreferences.info.rewards.value = values.rewards
    cntAccountData.contantPreferences.info.newsletter.value = values.newsletter

    setTimeout(() => {
      authStore.setAccountData(cntAccountData)
      setToastParams({
        msg: t("Contact Preferences has been updated successfully."),
        isSuccess: true,
      })
      setIsEditing(false)
      actions.setSubmitting(false)
    }, delayTime)
  }

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
      <p className="details-title">{t(authStore.accountData.contantPreferences.title)}</p>
      <p className="details-content">{t(authStore.accountData.contantPreferences.content)}</p>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSave(values, actions)
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="my-details-form">
            <FormControl component="fieldset" style={{ margin: 0, padding: "0 10px" }}>
              <FormGroup>
                <FormControlLabel
                  className="conference-checkbox"
                  control={
                    <Checkbox
                      checked={values.discount || false}
                      onChange={(e) => {
                        setFieldValue("discount", e.target.checked)
                        setIsEditing(true)
                      }}
                      name="discount"
                      color="primary"
                    />
                  }
                  label={t(preferrence.discount.label)}
                />
                <FormControlLabel
                  className="conference-checkbox"
                  control={
                    <Checkbox
                      checked={values.newStock || false}
                      onChange={(e) => {
                        setFieldValue("newStock", e.target.checked)
                        setIsEditing(true)
                      }}
                      name="newStock"
                      color="primary"
                    />
                  }
                  label={t(preferrence.newStock.label)}
                />
                <FormControlLabel
                  className="conference-checkbox"
                  control={
                    <Checkbox
                      checked={values.rewards || false}
                      onChange={(e) => {
                        setFieldValue("rewards", e.target.checked)
                        setIsEditing(true)
                      }}
                      name="rewards"
                      color="primary"
                    />
                  }
                  label={t(preferrence.rewards.label)}
                />
                <FormControlLabel
                  className="conference-checkbox"
                  control={
                    <Checkbox
                      checked={values.newsletter || false}
                      onChange={(e) => {
                        setFieldValue("newsletter", e.target.checked)
                        setIsEditing(true)
                      }}
                      name="newsletter"
                      color="primary"
                    />
                  }
                  label={t(preferrence.newsletter.label)}
                />
              </FormGroup>
            </FormControl>

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
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default observer(ContactPreferences)
