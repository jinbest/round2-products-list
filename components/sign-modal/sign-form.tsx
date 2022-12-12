import React, { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Form, Formik, FormikHelpers } from "formik"
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  TextField,
  InputAdornment,
} from "@material-ui/core"
import { SignParam, MockCredentialParam } from "../../models/sign-params"
import * as Yup from "yup"
import Loading from "../Loading"
import { CheckConfPass } from "../../service/hepler"
import { observer } from "mobx-react"
import { authStore, shopStore } from "../../store"
import { CHECKOUT_PROGRESS_STATUS } from "../../const/_variables"
import { ToastMsgParams } from "../toast/toast-msg-params"
import { useRouter } from "next/router"
import _ from "lodash"

type SignFormParam = {
  email: string
  password: string
  confPass: string
  first_name: string
  last_name: string
  receive_email: boolean
  agree_policy: boolean
}

type Props = {
  signKey: SignParam
  setSignKey: (val: SignParam) => void
  onCloseModal: () => void
  setToastParams: (val: ToastMsgParams) => void
}

const SignForm = ({ signKey, setSignKey, onCloseModal, setToastParams }: Props) => {
  const [t] = useTranslation()
  const delayTime = 2000
  const formikRef = useRef<any>()
  const router = useRouter()

  const initialValues = {
    email: "",
    password: "",
    confPass: "",
    first_name: "",
    last_name: "",
    receive_email: false,
    agree_policy: false,
  } as SignFormParam

  const [passType, setPassType] = useState(true)
  const [confPassType, setConfPassType] = useState(true)
  const [errFname, setErrFname] = useState("")
  const [errLname, setErrLname] = useState("")
  const [errConfPass, setErrConfPass] = useState("")

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.resetForm({
        values: {
          email: "",
          password: "",
          confPass: "",
          first_name: "",
          last_name: "",
          receive_email: false,
          agree_policy: false,
        },
        error: {},
      })
    }
  }, [signKey])

  const onSave = (values: any, actions: FormikHelpers<any>) => {
    if (signKey === "signup" && !validateForm(values)) {
      actions.setSubmitting(false)
      return
    }

    actions.setSubmitting(true)

    if (signKey === "login") {
      handleSignIn(
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
        },
        actions
      )
    } else {
      handleSignUp(
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
        },
        actions
      )
    }
  }

  const handleSignIn = (val: MockCredentialParam, actions: FormikHelpers<any>) => {
    const authCrendential = authStore.mockCredential
    let msg = t("You've logged in successfully."),
      isWarning = false

    if (val.email !== authCrendential.email || val.password !== authCrendential.password) {
      msg = t("Email or Password does not matched.")
      isWarning = true
    }

    if (isWarning) {
      setToastParams({
        msg,
        isSuccess: !isWarning,
        isWarning: isWarning,
      })
      actions.setSubmitting(false)
      return
    }

    setTimeout(() => {
      authStore.setAuthUser(val.email)
      // setToastParams({
      //   msg,
      //   isSuccess: !isWarning,
      //   isWarning: isWarning,
      // })
      if (authStore.progressForCheckout) {
        authStore.setProgressForCheckout(false)
        shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.shipping)
      } else {
        router.push("/account")
      }
      onCloseModal()
    }, delayTime)
  }

  const handleSignUp = (val: MockCredentialParam, actions: FormikHelpers<any>) => {
    const authCrendential = authStore.mockCredential
    let msg = t("You have been registered successfully."),
      isWarning = false

    if (val.email === authCrendential.email) {
      msg = t("This user has been registered already.")
      isWarning = true
    }

    if (isWarning) {
      setToastParams({
        msg,
        isSuccess: !isWarning,
        isWarning: isWarning,
      })
      actions.setSubmitting(false)
      return
    }

    setTimeout(() => {
      authStore.setMockCredential(val)
      handleUpdateAccountData(val)
      authStore.setAuthUser(val.email)
      // setToastParams({
      //   msg,
      //   isSuccess: !isWarning,
      //   isWarning: isWarning,
      // })
      if (authStore.progressForCheckout) {
        authStore.setProgressForCheckout(false)
        shopStore.setProgressStatus(CHECKOUT_PROGRESS_STATUS.shipping)
      } else {
        router.push("/account")
      }
      onCloseModal()
    }, delayTime)
  }

  const handleUpdateAccountData = (val: MockCredentialParam) => {
    const cntAccountData = _.cloneDeep(authStore.accountData)
    cntAccountData.myDetails.info = {
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      phone: "",
    }

    authStore.setAccountData(cntAccountData)
  }

  const clearError = () => {
    setErrFname("")
    setErrLname("")
    setErrConfPass("")
  }

  const validateForm = (val: SignFormParam) => {
    let result = true
    if (!val.first_name) {
      setErrFname(t("First Name is required."))
      result = false
    }
    if (!val.last_name) {
      setErrLname(t("Last Name is required."))
      result = false
    }
    if (!CheckConfPass(val.confPass, val.password)) {
      setErrConfPass(t("Confirm Password is not matched with the password."))
      result = false
    }
    setTimeout(() => {
      clearError()
    }, delayTime)
    return result
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(t("Invalid email.")).required(t("Email is required.")),
    password: Yup.string()
      .required(t("Password is required."))
      .min(8, t("Must be at least 8 characters."))
      .max(32, t("Must be 32 characters or less.")),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSave(values, actions)
      }}
      validationSchema={loginSchema}
      innerRef={formikRef}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting }) => (
        <Form className="sign-form">
          <label className="sign-label" htmlFor="email">
            {t("Email Address")}
            <span style={{ color: "red" }}>*</span>
          </label>
          <FormGroup className="form-group">
            <TextField
              id="email"
              name="email"
              InputLabelProps={{ required: false }}
              value={values.email}
              error={!!(errors.email && touched.email)}
              className="form-control"
              onChange={(e) => {
                setFieldValue("email", e.target.value)
              }}
              placeholder={t("Enter your email address...")}
              type="email"
              variant="outlined"
              margin="dense"
              helperText={errors.email && touched.email && errors.email}
            />
          </FormGroup>
          {signKey === "login" && (
            <button type="button" className="forgot-button">
              {t("Forgot Username?")}
            </button>
          )}

          {signKey === "signup" && (
            <div className="sign-flex-form">
              <div>
                <label className="sign-label" htmlFor="first_name">
                  {t("First Name")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <FormGroup className="form-group">
                  <TextField
                    id="first_name"
                    name="first_name"
                    InputLabelProps={{ required: false }}
                    value={values.first_name}
                    error={!!(errors.first_name && touched.first_name)}
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("first_name", e.target.value)
                    }}
                    placeholder={t("Enter your first name...")}
                    variant="outlined"
                    margin="dense"
                    helperText={errors.first_name && touched.first_name && errors.first_name}
                  />
                </FormGroup>
                {errFname && <p className="err-span">{errFname}</p>}
              </div>
              <div>
                <label className="sign-label" htmlFor="last_name">
                  {t("Last Name")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <FormGroup className="form-group">
                  <TextField
                    id="last_name"
                    name="last_name"
                    InputLabelProps={{ required: false }}
                    value={values.last_name}
                    error={!!(errors.last_name && touched.last_name)}
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("last_name", e.target.value)
                    }}
                    placeholder={t("Enter your last name...")}
                    variant="outlined"
                    margin="dense"
                    helperText={errors.last_name && touched.last_name && errors.last_name}
                  />
                </FormGroup>
                {errLname && <p className="err-span">{errLname}</p>}
              </div>
            </div>
          )}

          <label className="sign-label" htmlFor="password">
            {t("Password")}
            <span style={{ color: "red" }}>*</span>
          </label>
          <FormGroup className="form-group">
            <TextField
              id="password"
              name="password"
              InputLabelProps={{ required: false }}
              value={values.password}
              error={!!(errors.password && touched.password)}
              className="form-control"
              onChange={(e) => {
                setFieldValue("password", e.target.value)
              }}
              placeholder={t("Enter your password...")}
              type={passType ? "password" : "text"}
              variant="outlined"
              margin="dense"
              helperText={errors.password && touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setPassType(!passType)
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <span>{passType ? t("show") : t("hide")}</span>
                  </InputAdornment>
                ),
              }}
            />
          </FormGroup>

          {signKey === "signup" ? (
            <span className="form-description">
              {t(
                "At least 8 characters, includng 1 uppercase, 1 lowercase  and 1 number, you can never be too sure."
              )}
            </span>
          ) : (
            <button type="button" className="forgot-button">
              {t("Forgot Password?")}
            </button>
          )}

          {signKey === "signup" && (
            <>
              <label className="sign-label" htmlFor="confPass">
                {t("Confirm Password")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <FormGroup className="form-group">
                <TextField
                  id="confPass"
                  name="confPass"
                  InputLabelProps={{ required: false }}
                  value={values.confPass}
                  error={!!(errors.confPass && touched.confPass)}
                  className="form-control"
                  onChange={(e) => {
                    setFieldValue("confPass", e.target.value)
                  }}
                  placeholder={t("Re-enter your password...")}
                  type={confPassType ? "password" : "text"}
                  variant="outlined"
                  margin="dense"
                  helperText={errors.confPass && touched.confPass && errors.confPass}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => {
                          setConfPassType(!confPassType)
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <span>{confPassType ? t("show") : t("hide")}</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              {errConfPass && <p className="err-span">{errConfPass}</p>}
            </>
          )}

          {signKey === "signup" && (
            <FormControl component="fieldset" style={{ margin: 0 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.receive_email || false}
                      onChange={(e) => {
                        setFieldValue("receive_email", e.target.checked)
                      }}
                      name="receive_email"
                      color="primary"
                    />
                  }
                  label={t(
                    "I agree to receive emails with the best deals on the web and newsletter from DeviceList"
                  )}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.agree_policy || false}
                      onChange={(e) => {
                        setFieldValue("agree_policy", e.target.checked)
                      }}
                      name="agree_policy"
                      color="primary"
                    />
                  }
                  label={
                    <span>
                      {t("I agree to the DeviceList")} <a href="#">{t("Privacy Policy")}</a>
                    </span>
                  }
                />
              </FormGroup>
            </FormControl>
          )}
          <button className="sign-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>
                <Loading />
              </span>
            ) : (
              <>{signKey === "signup" ? t("Create Customer Account") : t("Log In")}</>
            )}
          </button>
          {signKey === "login" && (
            <button
              className="sign-button"
              type="button"
              onClick={() => {
                setSignKey("signup")
              }}
            >
              {t("Sign Up")}
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default observer(SignForm)
