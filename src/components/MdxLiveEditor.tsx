import React from "react"

import EasyMDE from "easymde"
import "easymde/dist/easymde.min.css"
import { renderToStaticMarkup } from "react-dom/server"
import * as mdx from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"

export default function editor({ easymde: easymdeConfig = {} }) {
  const config = {
    ...{
      autoDownloadFontAwesome: true,
      forceSync: true,
      autofocus: true,
      indentWithTabs: false,
      spellChecker: false,
      sideBySideFullscreen: false,
    },
    ...easymdeConfig,
  }

  const easymde = new EasyMDE({
    ...config,
    previewRender: plainText => {
      try {
        const jsx = mdx.evaluateSync(plainText, {
          ...runtime,
        })
        return renderToStaticMarkup(jsx.default())
      } catch (err) {
        console.error(err)
        return renderToStaticMarkup(
          <div>
            <h1>{err.name}</h1>
            <p>{err.message}</p>
          </div>
        )
      }
    },
  })
  EasyMDE.toggleSideBySide(easymde)

  return easymde
}
