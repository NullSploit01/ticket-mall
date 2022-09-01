import request from "supertest";
import { app } from "../../app";

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with no password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);
});

it("returns a 400 when a email that does not exist is provided", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 401 when incorrect password is provided", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "asdfghjkl",
    })
    .expect(400);
});

it("response with a cookie when provided valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
