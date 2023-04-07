import * as React from "react"
import Dashboard from "../components/Dashboard"
import Seo from "../components/Seo"
import { useTranslation } from "react-i18next"

const IndexPage = () => {
  const { t } = useTranslation()
  return (
    <Dashboard>
      <div>{t("welcome")}</div>
    </Dashboard>
  )
}

export const Head = () => <Seo />

export default IndexPage
