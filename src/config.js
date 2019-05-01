const config = {
  routes: [
    {
      key: 'home',
      lable: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      key: 'about',
      lable: 'About',
      icon: 'bar-chart',
      path: '/about',
    },
    {
      key: 'topics',
      lable: 'Topics',
      icon: 'stock',
      path: '/topics',
    },
  ],
  headers: [
    {
      key: 'popular',
      lable: '熱門',
      icon: 'rise',
      path: '/',
    },
    {
      key: 'near',
      lable: '附近',
      icon: 'environment',
      path: '/near',
    },
    {
      key: 'users',
      lable: '名人',
      icon: 'user',
      path: '/users',
    },
  ]
}

export default config;
