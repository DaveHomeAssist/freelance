// Vercel Serverless Function — POST /api/contact
// Accepts form submissions and writes them to the Notion database.
// Env vars required: NOTION_API_KEY (internal integration token)

const NOTION_DB_ID = "d7472c75-9e65-43b7-a06f-fd4926729ce1";

const ALLOWED_ORIGINS = [
  "https://davehomeassist.github.io",
  "https://freelance-mu-five.vercel.app",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
];
const MAX_MESSAGE_LENGTH = 5000;

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validatePayload(payload) {
  const errors = [];
  const name = clean(payload.name, 200);
  const email = clean(payload.email, 200);
  const message = clean(payload.message, MAX_MESSAGE_LENGTH + 1);

  if (name.length < 2) errors.push("name");
  if (!email) errors.push("email");
  else if (!isValidEmail(email)) errors.push("email");
  if (message.length > MAX_MESSAGE_LENGTH) errors.push("message_too_long");

  return errors;
}

export function buildProperties(payload) {
  return {
    Name: { title: [{ text: { content: clean(payload.name, 200) } }] },
    Email: { email: clean(payload.email, 200) },
    Phone: { phone_number: clean(payload.phone, 50) || null },
    Business: { rich_text: clean(payload.business, 200) ? [{ text: { content: clean(payload.business, 200) } }] : [] },
    Message: { rich_text: clean(payload.message, MAX_MESSAGE_LENGTH) ? [{ text: { content: clean(payload.message, MAX_MESSAGE_LENGTH) } }] : [] },
    Status: { select: { name: "New" } },
    Source: { select: { name: "Freelance Site" } },
  };
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.NOTION_API_KEY;
  if (!token) return res.status(500).json({ error: "Server misconfigured" });

  let payload = req.body || {};
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ error: "Invalid request body" });
    }
  }

  if (payload._honey || payload.website) {
    return res.status(200).json({ ok: true });
  }

  const errors = validatePayload(payload);
  if (errors.length) {
    return res.status(400).json({ error: "Validation failed.", fields: errors });
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB_ID },
        properties: buildProperties(payload),
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Notion API error:", err);
      return res.status(502).json({ error: "Failed to save submission" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
