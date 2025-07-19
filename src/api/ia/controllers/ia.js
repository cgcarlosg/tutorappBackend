'use strict';

const axios = require('axios');

module.exports = {
  async ask(ctx) {
    const { prompt } = ctx.request.body;

    const res = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt,
      stream: false
    });

    ctx.send({ response: res.data.response });
  }
};
