import React from "react";
import { Trans, t } from "@lingui/macro";
import { I18n } from "@lingui/react";

export default class Index extends React.Component {
  state = { name: "" };
  render() {
    const form = this.state;
    const name = form.name || "World";
    return (
      <div className="root">
        <h1>
          <Trans id="greeting">Hello {name}</Trans>
        </h1>
        <p>
          <Trans id="description">This is a demo of Lingui in Next.js</Trans>
        </p>
        <form>
          <label>
            <Trans id="form.name.label">Enter your name</Trans>
            <br />
            <I18n>
              {({ i18n }) => (
                <input
                  placeholder={i18n._(t("form.name.placeholder")`Your name`)}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={e => this.setState({ name: e.currentTarget.value })}
                />
              )}
            </I18n>
          </label>
        </form>
        <hr />
        <a href="/">English</a> <a href="/?locale=fr">Français</a>{" "}
        <a href="/?locale=es">Español</a>
        <style jsx global>{`
          .root {
            max-width: 600px;
            margin: 0 auto;
          }
          label {
            font-weight: bold;
          }
          input {
            font-size: 16px;
            line-height: 1;
            padding: 8px;
            border: 1px solid #888;
            border-radius: 4px;
          }
        `}</style>
        <style jsx global>{`
          body {
            padding: 20px;
            margin: 0;
            font-family: sans-serif;
          }
        `}</style>
      </div>
    );
  }
}
