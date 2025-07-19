module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/ia/ask',
      handler: 'ia.ask',
      config: { auth: false },
    },
  ],
};
