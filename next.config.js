const path = require("path");

module.exports = {
  webpack(config, { isServer }) {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@catalogs$"] = path.resolve(
      __dirname,
      isServer ? "./locale/catalogs.server.js" : "./locale/catalogs.client.js"
    );
    return config;
  }
};
