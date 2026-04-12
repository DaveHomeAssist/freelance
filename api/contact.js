// Vercel Serverless Function — POST /api/contact
// Accepts form submissions and writes them to the Notion database.
// Env vars required: NOTION_API_KEY (internal integration token)

const NOTION_DB_ID = "d7472c75-9e65-43b7-a06f-fd4926729ce1";

export default async function handler(req, res) {
  // CORS — allow the GitHub Pages origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.NOTION_API_KEY;
  if (!token) return res.status(500).json({ error: "Server misconfigured" });

  const { name, email, phone, business, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
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
        properties: {
          Name: { title: [{ text: { content: name } }] },
          Email: { email: email },
          Phone: { phone_number: phone || null },
          Business: { rich_text: business ? [{ text: { content: business } }] : [] },
          Message: { rich_text: message ? [{ text: { content: message } }] : [] },
          Status: { select: { name: "New" } },
          Source: { select: { name: "Freelance Site" } },
        },
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
