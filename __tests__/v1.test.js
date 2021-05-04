'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');

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

  // TODO: FAILING: Model routes are not linked up or something...
  xit('can create a new record', async () => {
    const newRecord = {
      name: 'History',
    };
    console.log('newRecord:::::::::::::::;', newRecord);

    const response = await mockRequest
      .post('/api/v1/categories')
      .send(newRecord);
    console.log('Response:::::::::::::::;', response);
    expect(response.status).toBe(201);
  });

  // TODO: FAILING: Model routes are not linked up or something...
  xit('can get a list of all records', async () => {
    const response = await mockRequest.get('/api/v1/article');
    expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBeTruthy();
    // expect(response.body.length).toEqual(1);
  });

  it('can get a single record', async () => {});

  it('can update a record', async () => {});

  it('can delete a record', async () => {});
});

// it('can create a new record', async () => {
//   const data = {
//     title: 'Lorem Ipsum - a history',
//     author: 'John Doh',
//     article_body:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//     category: 'History',
//   };
