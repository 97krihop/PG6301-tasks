const request = require("supertest");
const app = require("../../../src/server/app");

let counter = 0;

export const createUser = async (userId: string) => {
  const agent = request.agent(app);
  const res = await agent
    .post("/api/signup")
    .send({ username: userId, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res.statusCode).toEqual(201);

  const res2 = await agent
    .post("/api/login")
    .send({ username: userId, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res2.statusCode).toEqual(204);
  return agent;
};

it("should fail to login", async () => {
  const res = await request(app)
    .post("/api/login")
    .send({ username: "foo_" + counter++, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res.statusCode).toEqual(401);
});

it("should fail to get user", async () => {
  const res = await request(app).get("/api/user");
  expect(res.statusCode).toEqual(401);
});

it("should logout user", async () => {
  const res = await request(app).post("/api/logout");
  expect(res.statusCode).toEqual(204);
});

it("should create a user", async () => {
  const res = await request(app)
    .post("/api/signup")
    .send({ username: "foo_" + counter++, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res.statusCode).toEqual(201);
});

it("should fail to create a user", async () => {
  const res = await request(app)
    .post("/api/signup")
    .send({ username: "foo_" + counter, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res.statusCode).toEqual(201);

  const res2 = await request(app)
    .post("/api/signup")
    .send({ username: "foo_" + counter++, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res2.statusCode).toEqual(400);
});
it("should create a user and login", async () => {
  const res = await request(app)
    .post("/api/signup")
    .send({ username: "foo_" + counter, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res.statusCode).toEqual(201);

  const res2 = await request(app)
    .post("/api/login")
    .send({ username: "foo_" + counter++, password: "bar" })
    .set("Content-Type", "application/json");
  expect(res2.statusCode).toEqual(204);
});
it("should get a user and login", async () => {
  const userId = "foo_" + counter++;

  const agent = await createUser(userId);

  const {
    statusCode,
    body: { id, victories, defeats },
  } = await agent.get("/api/user");
  expect(statusCode).toEqual(200);
  expect(id).toBe(userId);
  expect(victories).toEqual(0);
  expect(defeats).toEqual(0);
});
it("should get a user and login", async () => {
  const userId = "foo_" + counter++;

  const agent = await createUser(userId);

  const {
    statusCode,
    body: { id, victories, defeats },
  } = await agent.get("/api/user");
  expect(statusCode).toEqual(200);
  expect(id).toBe(userId);
  expect(victories).toEqual(0);
  expect(defeats).toEqual(0);

  const res4 = await agent.post("/api/logout");
  expect(res4.statusCode).toEqual(204);

  const res5 = await agent.get("/api/user");
  expect(res5.statusCode).toEqual(401);
});
