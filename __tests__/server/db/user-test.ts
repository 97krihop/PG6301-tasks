const {
  getUser,
  verifyUser,
  createUser,
  resetAllUsers,
  reportEndOfMatch,
} = require("../../../src/server/db/users");

const user = {
  id: "user1",
  password: "password",
  victories: 0,
  defeats: 0,
};

beforeEach(() => {
  resetAllUsers();
});

test("should add a user", () => {
  expect(getUser(user.id)).toEqual(undefined);
  expect(createUser(user.id, user.password)).toBe(true);
  expect(getUser(user.id)).toEqual(user);
});

test("should add a user and use verifyUser", () => {
  expect(verifyUser(user.id, user.password)).toBe(false);
  expect(createUser(user.id, user.password)).toBe(true);
  expect(verifyUser(user.id, user.password)).toBe(true);
});

test("should not add 2 of the same person", () => {
  expect(createUser(user.id, user.password)).toBe(true);
  expect(createUser(user.id, user.password)).toBe(false);
});

test("should report a victory", () => {
  expect(createUser(user.id, user.password)).toBe(true);
  expect(getUser(user.id)).toEqual(user);
  reportEndOfMatch(user.id, true);
  expect(getUser(user.id)).toEqual({ ...user, victories: 1 });
});

test("should report a defeat", () => {
  expect(createUser(user.id, user.password)).toBe(true);
  expect(getUser(user.id)).toEqual(user);
  reportEndOfMatch(user.id, false);
  expect(getUser(user.id)).toEqual({ ...user, defeats: 1 });
});

test("should throw error", () => {
  expect(() => reportEndOfMatch(2, false)).toThrow();
});

test("should throw error", () => {
  expect(createUser(user.id, user.password)).toBe(true);
  expect(getUser(user.id)).toEqual(user);
  resetAllUsers();
  expect(getUser(user.id)).toEqual(undefined);
});
