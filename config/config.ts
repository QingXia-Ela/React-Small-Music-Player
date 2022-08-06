import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  publicPath: '/static/',
  hash: true,
  history: {
    type: 'browser',
  },
  routes,
  dynamicImport: {
    loading: '@/components/loading',
  },
  antd: false,
});
