import NextApp, { Container } from "next/app";
import React from "react";
import { I18nProvider } from "@lingui/react";
import getCatalog from "@catalogs";

export default class App extends NextApp {
  static async getInitialProps({ query, Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, locale: ctx.query.locale };
  }

  render() {
    const { Component, pageProps, locale } = this.props;
    const catalog = getCatalog(locale);
    return (
      <Container>
        <I18nProvider language={locale} catalogs={{ [locale]: catalog }}>
          <Component {...pageProps} />
        </I18nProvider>
      </Container>
    );
  }
}
