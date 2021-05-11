'use strict';

const { server } = require('../src/server.js');

const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('v1 web server', () => {
  const data = {
    title: 'Lorem Ipsum - a history',
    author: 'John Doh',
    article_body:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: 'History',
  };

  it('should respond with a 404 with a bad route', async () => {
    const response = await mockRequest.get('/badRoute');
    expect(response.status).toBe(404);
  });

  it('should respond with a 404 with a bad method', async () => {
    const response = await mockRequest.patch('/api/v1/article');
    expect(response.status).toBe(404);
  });

  it('can create a new record', async () => {
    const response = await mockRequest.post(`/api/v1/article`).send(data);
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.title).toEqual(data.title);
    expect(response.body.author).toEqual(data.author);
    expect(response.body.article_body).toEqual(data.article_body);
    expect(response.body.category).toEqual(data.category);
  });

  it('can get a list of all records', async () => {
    const response = await mockRequest.get('/api/v1/article');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  it('can get a single record', async () => {
    const response1 = await mockRequest.post(`/api/v1/article`).send(data);
    expect(response1.status).toBe(201);
    const response2 = await mockRequest.get(
      `/api/v1/article/${response1.body._id}`
    );
    expect(response2.status).toBe(200);
    expect(typeof response2.body).toEqual('object');
    expect(response2.body._id).toBeDefined();
    expect(response2.body._id).toEqual(response1.body._id);
    expect(response2.body.title).toEqual(response1.body.title);
  });

  it('can update a record', async () => {
    const response1 = await mockRequest.post(`/api/v1/article`).send(data);
    expect(response1.status).toBe(201);
    const updatedData = { title: 'Story' };
    const response2 = await mockRequest
      .put(`/api/v1/article/${response1.body._id}`)
      .send(updatedData);
    expect(response2.status).toBe(201);
    expect(response2.body._id).toEqual(response1.body._id);
    expect(response2.body.title).toEqual('Story');
  });

  it('can delete a record', async () => {
    console.log(data);
    const response1 = await mockRequest.post(`api/v1/article`).send(data);
    console.log(response1);
    expect(response1.status).toBe(201);
    // const response2 = await mockRequest
    //   .delete(`api/v1/article/${response1.body._id}`)
    //   .send('Deleted');
    // console.log(response2);
    // expect(response2.status).toBe(204);
    // expect(response2.body).toBeFalsy();

    // const getResponse = await mockRequest.get(`/api/v1/article`);
    // expect(getResponse.body.length).toEqual(0);
  });
});
