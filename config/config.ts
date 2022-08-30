import { getWeatherUrl } from '../src/constant/api/weather';
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  publicPath: '/',
  hash: true,
  history: {
    type: 'browser',
  },
  routes,
  dynamicImport: {},
  antd: false,
  title: "Shiina's Music Website",
  proxy: {
    '/weather': {
      target: getWeatherUrl,
      changeOrigin: true,
      pathRewrite: { '^/weather': '' },
    },
  },
});
