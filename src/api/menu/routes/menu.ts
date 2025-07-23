module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/menu',
      handler: 'menu.list',
      config: { auth: false }
    }
  ]
};