const Timestamp = new Date().getTime();
const n = require("./package");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: "/shensuo/admin/dev",
  lintOnSave: false,
  chainWebpack: config => {
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });
  },
  configureWebpack: {
    output: {
      filename: `[name].${n.version}.${Timestamp}.js`,
      chunkFilename: `[name].${n.version}.${Timestamp}.js`
    }
  }
};
