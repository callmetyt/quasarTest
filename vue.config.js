module.exports = {
  //能够部署到任意目录
  publicPath: "./",
  //quasar 插件的配置
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
      supportTS: true,
    },
  },
  transpileDependencies: ["quasar"],
};
