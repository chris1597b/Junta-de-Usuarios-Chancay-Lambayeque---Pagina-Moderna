import express from "express";

const app = express();

app.get("/webhooks/facebook", (req, res) => {
    const VERIFY_TOKEN = "Romacix_token";

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
    }
});

app.listen(3000, () => console.log("Servidor activo"));
