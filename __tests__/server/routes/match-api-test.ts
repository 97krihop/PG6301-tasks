import { createUser } from "./auth-api-test";

const request = require("supertest");
const app = require("../../../src/server/app");

it("should return 401", async () => {
  const res = await request(app).post("/api/matches");
  expect(res.statusCode).toEqual(401);
});

it("should return quizzes", async () => {
  const agent = await createUser("aaa");

  const res = await agent.post("/api/matches");
  expect(res.statusCode).toEqual(201);
});
