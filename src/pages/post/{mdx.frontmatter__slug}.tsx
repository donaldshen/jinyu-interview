import React from "react"
import Dashboard from "../../components/Dashboard"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Paper } from "@mui/material"
import PreviewEditor from "../../components/PreviewEditor"
import Seo from "../../components/Seo"
import styled from "@emotion/styled"

const shortcodes = { Link } // Provide common components here

const Toolbar = styled.div({
  margin: "16px 0",
})

export default function PostPage({ children, data }) {
  return (
    <Dashboard>
      <Toolbar>
        <PreviewEditor data={data.mdx} />
      </Toolbar>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          // height: 240,
        }}
      >
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </Paper>
    </Dashboard>
  )
}

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      body
    }
  }
`
