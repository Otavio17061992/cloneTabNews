import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "name, email e message são obrigatórios" });
    }

    try {
        const data = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL || "joao.almeida48@outlook.com",
            subject: `Nova mensagem de contato de ${name}`,
            reply_to: email,
            text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
        });

        console.log("📩 E-mail enviado com sucesso:", data);

        return res.status(200).json({
            success: true,
            message: "Mensagem recebida com sucesso! Responderei em breve.",
        });
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error);
        return res.status(500).json({ error: "Erro interno ao enviar a mensagem." });
    }
}
