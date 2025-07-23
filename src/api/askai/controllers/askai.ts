'use strict';

const axios = require('axios');
const pdfParse = require('pdf-parse');

module.exports = {
  async ask(ctx) {
    const { prompt, model = 'llama3', pdfUrl } = ctx.request.body;

    if (!prompt && !pdfUrl) {
      return ctx.badRequest('Falta el prompt o el pdfUrl');
    }

    try {
      let fullPrompt = prompt;

      // Si viene una URL de PDF, leer el contenido
      if (pdfUrl) {
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const data = await pdfParse(pdfResponse.data);
        const extractedText = data.text;

        // Combina el texto del PDF con el prompt
        fullPrompt = `${prompt}\n\nContenido del documento:\n${extractedText}`;
      }

      // Llamada a Ollama
      const res = await axios.post('http://localhost:11434/api/generate', {
        model,
        prompt: fullPrompt,
        stream: false
      });

      ctx.send({ response: res.data.response });
    } catch (error) {
      strapi.log.error('Error al comunicar con Ollama:', error.message);
      ctx.internalServerError('No se pudo obtener respuesta de la IA');
    }
  }
};
