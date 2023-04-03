import http from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import app from "../src/app.js";

config();

const JWT_SECRET = process.env.JWT_SECRET || "my-secret";

// Define a helper function to generate JWT tokens
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
});

test.after.always((t) => {
  t.context.server.close();
});

test.serial(
  "login with valid credentials should return a JWT token",
  async (t) => {
    const response = await got.post("login", {
      prefixUrl: t.context.prefixUrl,
      json: {
        username: "admin",
        password: "password",
      },
      responseType: "json",
    });

    t.is(response.statusCode, 200);
    t.truthy(response.body.token);
  }
);

test("login with invalid credentials should return an error", async (t) => {
  const response = await got.post("login", {
    prefixUrl: t.context.prefixUrl,
    json: {
      username: "admin",
      password: "wrong-password",
    },
    responseType: "json",
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 401);
});

test("protected route without authentication should return an error", async (t) => {
  const response = await got("protected", {
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 401);
});

test.serial(
  "protected route with authentication should return the resource",
  async (t) => {
    const token = generateToken({ username: "admin", role: "admin" });

    const response = await got("protected", {
      prefixUrl: t.context.prefixUrl,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    t.is(response.statusCode, 200);
  }
);

test("admin route without authentication should return an error", async (t) => {
  const response = await got("admin", {
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 401);
});

test("admin route with authentication but without authorization should return an error", async (t) => {
  const { body } = await got.post("login", {
    prefixUrl: t.context.prefixUrl,
    json: {
      username: "user",
      password: "password",
    },
    responseType: "json",
  });

  const response = await got("admin", {
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
    headers: {
      Authorization: `Bearer ${body.token}`,
    },
    throwHttpErrors: false,
  });

  t.is(response.statusCode, 403);
});

test.serial(
  "admin route with authentication and authorization should return the resource",
  async (t) => {
    const token = generateToken({ username: "admin", role: "admin" });

    const response = await got("admin", {
      prefixUrl: t.context.prefixUrl,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    t.is(response.statusCode, 200);
  }
);
