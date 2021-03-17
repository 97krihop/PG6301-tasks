const request = require('supertest');
const app = require('../../src/server/app');

it('should return index.html', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.headers).toHaveProperty(
    'content-type',
    'text/html; charset=UTF-8'
  );
});
it('should return index', async () => {
  const res = await request(app).get('/aswsawd');
  //TODO should return 404
  expect(res.status).toBe(200);
});
export {};
