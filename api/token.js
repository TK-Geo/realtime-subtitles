export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "realtime"
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      res.status(r.status).send(t);
      return;
    }

    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(String(err));
  }
}
