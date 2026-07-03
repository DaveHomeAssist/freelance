const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const SOURCE_PATH = path.join(__dirname, "..", "api", "contact.js");
const ORIGINAL_ENV = { ...process.env };

function loadContactApi(fetchMock = async () => ({ ok: true, json: async () => ({}) })) {
  const source = fs.readFileSync(SOURCE_PATH, "utf8")
    .replace("export default async function handler", "async function handler")
    .replace("export function validatePayload", "function validatePayload")
    .replace("export function buildProperties", "function buildProperties")
    .concat("\nmodule.exports = { handler, validatePayload, buildProperties };\n");

  const context = {
    module: { exports: {} },
    console,
    fetch: fetchMock,
    process,
  };
  vm.runInNewContext(source, context, { filename: SOURCE_PATH });
  return context.module.exports;
}

function req(body, overrides = {}) {
  return {
    method: "POST",
    headers: { origin: "http://localhost:8000" },
    body,
    ...overrides,
  };
}

function res() {
  return {
    headers: {},
    statusCode: null,
    body: null,
    ended: false,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

test.afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

test("contact API writes valid submissions to Notion", async () => {
  process.env.NOTION_API_KEY = "test-token";
  const calls = [];
  const { handler } = loadContactApi(async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => ({}) };
  });
  const response = res();

  await handler(req({
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "856-555-1111",
    business: "Restaurant",
    message: "Need a fast lead-gen site.",
  }), response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.equal(calls.length, 1);
  const notionBody = JSON.parse(calls[0].options.body);
  assert.equal(notionBody.properties.Name.title[0].text.content, "Jane Smith");
  assert.equal(notionBody.properties.Email.email, "jane@example.com");
  assert.equal(notionBody.properties.Source.select.name, "Freelance Site");
});

test("contact API rejects invalid email before calling Notion", async () => {
  process.env.NOTION_API_KEY = "test-token";
  let called = false;
  const { handler } = loadContactApi(async () => {
    called = true;
    return { ok: true, json: async () => ({}) };
  });
  const response = res();

  await handler(req({ name: "Jane Smith", email: "bad-email" }), response);

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, "Validation failed.");
  assert.deepEqual([...response.body.fields], ["email"]);
  assert.equal(called, false);
});

test("contact API silently accepts honeypot submissions without calling Notion", async () => {
  process.env.NOTION_API_KEY = "test-token";
  let called = false;
  const { handler } = loadContactApi(async () => {
    called = true;
    return { ok: true, json: async () => ({}) };
  });
  const response = res();

  await handler(req({ name: "Bot", email: "bot@example.com", _honey: "filled" }), response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.equal(called, false);
});

test("contact API handles string JSON request bodies", async () => {
  process.env.NOTION_API_KEY = "test-token";
  const { handler } = loadContactApi();
  const response = res();

  await handler(req(JSON.stringify({ name: "String Body", email: "string@example.com" })), response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
});

test("contact API OPTIONS preflight ends without requiring env", async () => {
  const { handler } = loadContactApi();
  const response = res();

  await handler(req(null, { method: "OPTIONS" }), response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.ended, true);
  assert.equal(response.headers["Access-Control-Allow-Methods"], "POST, OPTIONS");
});
