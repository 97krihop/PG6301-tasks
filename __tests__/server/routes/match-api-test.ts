const request = require("supertest");
const app = require("../../../src/server/app");

it("should return quizzes", async () => {
  const res = await request(app).post("/api/matches");
  expect(res.statusCode).toEqual(201);
  expect(res.body.length).toBe(3);
});
export {};
