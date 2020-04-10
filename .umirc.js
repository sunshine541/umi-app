import path from 'path';
const px2rem = require('postcss-px2rem-exclude');

export default {
  treeShaking: true,
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  extraPostCSSPlugins: [
    px2rem({
      remUnit: 75
    })
  ],
  proxy: {
    "/api/*": {
      "target": "http://2.2.2.2",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi-app-new',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  /**
   * 路由相关配置
   */
  routes: [{
    path: '/',
    component: '../pages/IndexPage',
  }],
}
