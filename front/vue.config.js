module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:80"
      }
    }
  },
  productionSourceMap: false
};
