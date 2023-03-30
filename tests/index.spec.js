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

test.serial("get /", async (t) => {
  const { message } = await got("", {
    prefixUrl: t.context.prefixUrl,
  }).json();

  t.is(message, "👋🌎🌍🌏");
});
