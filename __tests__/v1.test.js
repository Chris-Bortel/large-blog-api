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
    // Check for whether we are receiving an id
    expect(response.body._id).toBeDefined();
    console.log(response.body._id);
    // Check to see whether the data sent is in the database
    expect(response.body.title).toEqual(data.title);
    expect(response.body.author).toEqual(data.author);
    expect(response.body.article_body).toEqual(data.article_body);
    expect(response.body.category).toEqual(data.category);
  });

  // TODO: FAILING: Model routes are not linked up or something...
  it('can get a list of all records', async () => {
    const response = await mockRequest.get('/api/v1/article');
    expect(response.status).toBe(200);
    // Checking for the data type of the response
    expect(Array.isArray(response.body)).toBeTruthy();
    console.log(response.body);
    // TODO: Why is this not working when response.body is and array of one?
    // expect(response.body.length).toEqual(1);
  });

  it('can get a single record', async () => {
    const response = await mockRequest.get(`/api/v1/article/${1}`);
    console.log(response.body);
    expect(response.status).toBe(200);
    //TODO: This may be the issue as well?
    expect(typeof response.body).toEqual('object');
    expect(response.body._id).toBeDefined();
    expect(response.body._id).toEqual(body._id);
  });

  it('can update a record', async () => {});

  it('can delete a record', async () => {});
});
// TODO: This is not receiving the body/ The id is always changing, so if I put the actual id in there, it returns null

// it('can create a new record', async () => {
//   const data = {
//     title: 'Lorem Ipsum - a history',
//     author: 'John Doh',
//     article_body:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//     category: 'History',
//   };
