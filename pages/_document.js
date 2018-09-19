import NextDocument, { Head, Main, NextScript } from "next/document";

const supportedLocale = ["en", "fr", "es"];

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const queryLocale = ctx.query.locale;
    const locale = supportedLocale.find(l => l === queryLocale)
      ? queryLocale
      : "en";

    const linguiCatalog = await import(`raw-loader!../locale/${locale}/messages.js`).then(
      mod => mod.default
    );

    const initialProps = await NextDocument.getInitialProps(ctx);

    return { ...initialProps, linguiCatalog };
  }

  render() {
    const { linguiCatalog } = this.props;
    return (
      <html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: linguiCatalog }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
