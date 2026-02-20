export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "name, email e message são obrigatórios" });
    }

    // integrar com um serviço de e-mail (SendGrid, Nodemailer, etc.)
    console.log("📩 Nova mensagem de contato:", { name, email, message });

    return res.status(200).json({
        success: true,
        message: "Mensagem recebida com sucesso! Responderei em breve.",
    });
}
