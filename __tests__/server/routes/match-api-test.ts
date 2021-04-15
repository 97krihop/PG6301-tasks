import { createUser } from "./auth-api-test";
import { resetAllUsers } from "../../../src/server/db/users";
import { quiz } from "../../../src/server/db/quizzes";

const request = require("supertest");
const app = require("../../../src/server/app");
beforeEach(() => {
  resetAllUsers();
});
let counter = 0;
describe("/api/matches", () => {
  it("post matches should return 401", async () => {
    const res = await request(app).post("/api/matches");
    expect(res.statusCode).toEqual(401);
  });
  it("post ongoing should return 401", async () => {
    const res = await request(app).post("/api/matches/ongoing");
    expect(res.statusCode).toEqual(401);
  });
  it("get ongoing should return 401", async () => {
    const res = await request(app).get("/api/matches/ongoing");
    expect(res.statusCode).toEqual(401);
  });

  it("should return start match", async () => {
    const agent = await createUser("user" + counter++);

    const res = await agent.post("/api/matches");
    expect(res.statusCode).toEqual(201);
  });

  it("should return first quiz", async () => {
    const agent = await createUser("user" + counter++);

    const res = await agent.post("/api/matches");
    expect(res.statusCode).toEqual(201);

    const res2 = await agent.get("/api/matches/ongoing");
    expect(res2.statusCode).toEqual(200);
  });

  it("should return 404 if no match is on", async () => {
    const agent = await createUser("user" + counter++);
    const res = await agent.get("/api/matches/ongoing");
    expect(res.statusCode).toEqual(404);
  });

  it("should return first quiz and loose", async () => {
    const agent = await createUser("user" + counter++);

    const res = await agent.post("/api/matches");
    expect(res.statusCode).toEqual(201);

    const res2 = await agent.get("/api/matches/ongoing");
    expect(res2.statusCode).toEqual(200);
    const correct = quiz.filter(
      (x) => x.question === res2.body.currentQuiz.question
    );
    const res3 = await agent
      .post("/api/matches/ongoing")
      .send({ answer: (correct[0].correct + 1) % 4 })
      .set("Content-Type", "application/json");
    expect(res3.statusCode).toEqual(201);
    expect(res3.body.defeat).toBe(true);
    expect(res3.body.victory).toBe(false);
  });

  it("should return win", async () => {
    const agent = await createUser("user" + counter++);

    const res = await agent.post("/api/matches");
    expect(res.statusCode).toEqual(201);

    const res2 = await agent.get("/api/matches/ongoing");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.defeat).toBe(false);
    expect(res2.body.victory).toBe(false);
    const question1 = quiz.filter(
      (x) => x.question === res2.body.currentQuiz.question
    );
    const res3 = await agent
      .post("/api/matches/ongoing")
      .send({ answer: question1[0].correct })
      .set("Content-Type", "application/json");
    expect(res3.statusCode).toEqual(201);
    expect(res3.body.defeat).toBe(false);
    expect(res3.body.victory).toBe(false);
    const question2 = quiz.filter(
      (x) => x.question === res3.body.currentQuiz.question
    );
    const res4 = await agent
      .post("/api/matches/ongoing")
      .send({ answer: question2[0].correct })
      .set("Content-Type", "application/json");
    expect(res4.statusCode).toEqual(201);
    expect(res4.body.defeat).toBe(false);
    expect(res4.body.victory).toBe(false);
    const question3 = quiz.filter(
      (x) => x.question === res4.body.currentQuiz.question
    );
    const res5 = await agent
      .post("/api/matches/ongoing")
      .send({ answer: question3[0].correct })
      .set("Content-Type", "application/json");
    expect(res5.statusCode).toEqual(201);
    expect(res5.body.defeat).toBe(false);
    expect(res5.body.victory).toBe(true);
  });
});
