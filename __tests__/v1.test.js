'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const mockRequest = supertest(server);

describe('v1 web server', () => {
  it('should respond with a 404 with a bad route', async () => {
    const response = await mockRequest.get('/badRoute');
    expect(response.status).toBe(404);
  });

  it('should respond with a 404 with a bad method', async () => {
    const response = await mockRequest.patch('/api/v1/article');
    expect(response.status).toBe(404);
  });

  it('can create a new record', async () => {
    const newRecord = {};
    const response = await mockRequest;
  });

  it('can get a list of all records', async () => {});

  it('can get a single record', async () => {});

  it('can update a record', async () => {});

  it('can delete a record', async () => {});
});
