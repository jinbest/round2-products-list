import { object } from "yup"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"

export const SIGN_FORM_VALIDATION = () => {
  const [t] = useTranslation()

  const schema = {
    email: Yup.string().email(t("Invalid email")).required(t("required")),
    password: Yup.string()
      .required(t("required"))
      .min(8, t("Must be at least 8 characters"))
      .max(32, t("Must be 32 characters or less")),
  } as Record<string, any>

  return object().shape(schema)
}
