import * as React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { useLocation } from "@reach/router"

export default function ListItems() {
  const location = useLocation()
  // 获取 md 列表
  const data = useStaticQuery(graphql`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `)

  return (
    <>
      {data.allMdx.nodes.map(({ frontmatter: { slug, title } }) => {
        const to = `/post/${slug}`
        return (
          <ListItemButton
            key={slug}
            selected={`${to}/` === location.pathname}
            onClick={() => navigate(to)}
          >
            <ListItemText primary={title} />
          </ListItemButton>
        )
      })}
    </>
  )
}
