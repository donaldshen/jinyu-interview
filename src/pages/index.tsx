import * as React from "react"
import Dashboard from "../components/Dashboard"
import Seo from "../components/Seo"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"

const Box = styled.div`
  margin-top: 16px;
`

const IndexPage = () => {
  const { t } = useTranslation()
  return (
    <Dashboard>
      <Box>{t("welcome")}</Box>
    </Dashboard>
  )
}

export const Head = () => <Seo />

export default IndexPage
