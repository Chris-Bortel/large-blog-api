'use strict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
console.log = jest.fn();

describe('server tests', () => {
  it('should respond with a 200 on a valid route', async () => {
    const result = await mockRequest.get('/api/v1/article');
    expect(result.status).toBe(200);
  });

  it('should respond with a 404 on an invalid route', async () => {
    const results = await mockRequest.get('/badRoutes');
    expect(results.status).toBe(404);
  });

  it('should respond with a 404 on an invalid method', async () => {
    const response = await mockRequest.put('/api/v1/article');
    expect(response.status).toBe(404);
  });

  // it('should create server on ')
});
