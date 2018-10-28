const OpenAPIBackend = require('openapi-backend').default;
const express = require('express');
const app = express();

// define api
const api = new OpenAPIBackend({
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    paths: {
      '/pets': {
        get: {
          operationId: 'getPets',
          responses: {
            200: { description: 'ok' },
          },
        },
      },
      '/pets/{id}': {
        get: {
          operationId: 'getPetById',
          responses: {
            200: { description: 'ok' },
          },
        },
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
      },
    },
  },
  handlers: {
    getPets: async (req, res) => res.status(200).json({ operationId: 'getPets' }),
    getPetById: async (req, res) => res.status(200).json({ operationId: 'getPetsById' }),
    notFound: async (req, res) => res.status(200).json({ err: 'not found' }),
    validationFail: async (err, req, res) => res.status(200).json({ err }),
  },
});

api.init();

// use as express middleware
app.use((req, res) => api.handleRequest(req, req, res));

// start server
app.listen(9000, () => console.info('api listening at http://localhost:9000'));
