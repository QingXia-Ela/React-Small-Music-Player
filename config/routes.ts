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
      {
        exact: true,
        path: '/SongList',
        component: '@/pages/SongListPage',
      },
      {
        exact: true,
        path: '/music/:id?',
        component: '@/pages/DetailsPage',
      },
    ],
  },
];
