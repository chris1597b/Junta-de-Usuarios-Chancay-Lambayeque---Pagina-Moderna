// api/webhooks/facebook.js
// Vercel Serverless Function — Verificación de Webhook de Meta/Facebook

const VERIFY_TOKEN = "Romacix_token";

export default function handler(req, res) {
  // ─── GET: Verificación inicial del Webhook ───────────────────────────────
  if (req.method === "GET") {
    const mode      = req.query["hub.mode"];
    const token     = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook de Facebook verificado correctamente.");
      return res.status(200).send(challenge); // Meta espera solo este valor
    }

    console.warn("❌ Token de verificación inválido:", token);
    return res.status(403).send("Token inválido");
  }

  // ─── POST: Recibir eventos del Webhook ───────────────────────────────────
  if (req.method === "POST") {
    const body = req.body;

    if (body.object === "page") {
      body.entry?.forEach((entry) => {
        const webhookEvent = entry.messaging?.[0] ?? entry.changes?.[0];
        console.log("📩 Evento recibido:", JSON.stringify(webhookEvent));
        // Aquí puedes procesar los eventos (nuevas publicaciones, comentarios, etc.)
      });

      return res.status(200).send("EVENT_RECEIVED");
    }

    return res.status(404).send("Not found");
  }

  // ─── Otros métodos no permitidos ─────────────────────────────────────────
  return res.status(405).send("Method Not Allowed");
}
