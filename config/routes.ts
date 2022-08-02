export default [
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        exact: true,
        path: '/',
        component: '@/pages/IndexPage',
      },
      // {
      //   exact: true,
      //   path: '/list',
      //   component: '@/pages/ListPage'
      // }
    ],
  },
];
