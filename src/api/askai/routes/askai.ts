'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/askai/ask',
      handler: 'askai.ask',
      config: {
        auth: false,
      },
    },
  ],
};
