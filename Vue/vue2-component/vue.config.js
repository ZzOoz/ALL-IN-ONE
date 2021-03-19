const path = require("path");
const resolve = (name) => {
  return path.join(__dirname, name);
};
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src")).set("~", resolve("packages"));
  },
};
