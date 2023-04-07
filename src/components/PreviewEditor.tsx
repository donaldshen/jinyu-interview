import React, { useCallback, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import mdxLiveEditor from "./MdxLiveEditor"
import { useTranslation } from "react-i18next"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Textarea = styled.textarea`
  min-width: 100vw;
  min-height: 100vh;
`
const components = [
  {
    tagname: "Link",
    component: Link,
    title: "Link",
  },
]

export default function PreviewEditor({
  data: {
    frontmatter: { title },
    body,
  },
}) {
  const [open, setOpen] = React.useState(false)
  const [editor, setEditor] = useState<any>(null)

  const editorRefCallback = useCallback(ref => {
    if (!ref) return
    console.log(`editor init`)
    setEditor(
      mdxLiveEditor({
        easymde: { element: ref },
      })
    )
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { t } = useTranslation()

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {t("edit")}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Textarea ref={editorRefCallback} id="editor" defaultValue={body} />
      </Dialog>
    </div>
  )
}
