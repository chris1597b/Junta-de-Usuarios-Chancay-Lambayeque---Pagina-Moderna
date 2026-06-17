export default function handler(req, res) {
    const VERIFY_TOKEN = "Romacix_token";

    if (req.method === "GET") {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (mode && token) {
            if (mode === "subscribe" && token === VERIFY_TOKEN) {
                console.log("✅ Webhook verificado correctamente");
                res.status(200).send(challenge);
            } else {
                res.status(403).send("Token inválido");
            }
        } else {
            res.status(400).send("Parámetros incompletos");
        }
    } else if (req.method === "POST") {
        console.log("Evento recibido:", req.body);
        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.status(404).send("Not found");
    }
}
