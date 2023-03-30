import http from "http";
import test from "ava";
import got from "got";
import listen from "test-listen";
import app from "../src/app.js";

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
});

test.after.always((t) => {
  t.context.server.close();
});

test.serial("POST /transactions returns remaining amount after theft", async (t) => {
  const amount = 20;

  const res = await got
    .post("transaction", { prefixUrl: t.context.prefixUrl, json: { amount } })
    .json();

  t.is(res.amount, amount / 2);
});

test.serial("application-level middleware works for all POST request", async (t) => {
  const res = await got
    .post("another-route", { prefixUrl: t.context.prefixUrl })
    .json();

  t.is(typeof res.amount, "number");
});

test.serial("application-level middleware doesn't work for any PATCH request", async (t) => {
  const res = await got
    .patch("another-route", { prefixUrl: t.context.prefixUrl })
    .json();

  t.is(typeof res.amount, "undefined");
});
