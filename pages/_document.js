import NextDocument, { Head, Main, NextScript } from "next/document";

const supportedLocales = ["en", "fr", "es"];

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    
    // Try to detect locale from:
    // * locale query string param (e.g. ?locale=fr)
    // * hostname (e.g. `en.example.com`, `fr.example.com`, etc)
    // First locale specified in supportedLocales is the default fallback used
    const detectedLocale = ctx.query.locale || ctx.req.headers.host.split('.')[0];
    const locale = supportedLocales.find(l => l === detectedLocale) ? detectedLocale : supportedLocales[0];
    
    // Load source for current translation file and inject into page (hacky!)
    let linguiCatalog = await import(`raw-loader!../locale/${locale}/messages.js`).then(mod => mod.default);
    linguiCatalog = linguiCatalog.replace('module.exports = {', 'window.LINGUI_CATALOG = {');

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
