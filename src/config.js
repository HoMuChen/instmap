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
      key: 'messages',
      lable: '訊息',
      icon: 'bell',
      path: '/messages',
    },
    {
      key: 'settinng',
      lable: '設定',
      icon: 'setting',
      path: '/setting',
    },
  ]
}

export default config;
