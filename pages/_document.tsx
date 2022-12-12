import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import config from "../static/config.json"
import { ServerStyleSheets } from "@material-ui/styles"

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content={config.headerData.description} />
          <link rel="icon" href={config.headerData.favicon} />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.7/css/swiper.min.css"
          ></link>
        </Head>

        <body>
          <Main />
        </body>

        <NextScript />
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
