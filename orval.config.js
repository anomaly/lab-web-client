module.exports = {
  labs: {
    output: {
      mode: 'tags-split',
      target: 'src/api/labs.ts',
      schemas: 'src/api/models',
      client: 'react-query',
      mock: true,
    },
    input: {
      target: 'http://localhost:8000/openapi.json',
    },
  },
};