import test from "ava";
import got from "got";
import http from "http";
import listen from "test-listen";
import app from "../src/app.js";

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
});

test.after.always((t) => {
  t.context.server.close();
});

test.serial(
  "/to-celsius returns celsius as 0 when input is { fahrenheit: 32 }",
  async (t) => {
    const { celsius } = await got
      .post("api/to-celsius", {
        prefixUrl: t.context.prefixUrl,
        json: { fahrenheit: 32 },
      })
      .json();

    t.is(celsius, 0);
  }
);

test.serial(
  "/to-fahrenheit returns fahrenheit as 41 when input is { celsius: 5 }",
  async (t) => {
    const { fahrenheit } = await got
      .post("api/to-fahrenheit", {
        prefixUrl: t.context.prefixUrl,
        json: { celsius: 5 },
      })
      .json();

    t.is(fahrenheit, 41);
  }
);

test.serial("-40 fahrenheit should equal to -40 celsius", async (t) => {
  const { celsius } = await got
    .post("api/to-celsius", {
      prefixUrl: t.context.prefixUrl,
      json: { fahrenheit: -40 },
    })
    .json();

  const { fahrenheit } = await got
    .post("api/to-fahrenheit", {
      prefixUrl: t.context.prefixUrl,
      json: { celsius: -40 },
    })
    .json();

  t.is(celsius, fahrenheit);
});
