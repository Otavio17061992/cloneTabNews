import CommentModel from "../../../../models/commentModel.js";
import { rateLimit } from "../../../../Infra/rateLimiter.js";

export default async function handler(req, res) {
    // GET /api/v1/comments?post_id=123
    if (req.method === "GET") {
        const { post_id } = req.query;

        if (!post_id) {
            return res.status(400).json({ error: "post_id é obrigatório" });
        }

        try {
            const comments = await CommentModel.getByPostId(post_id);
            return res.status(200).json({ comments });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar comentários" });
        }
    }

    // POST /api/v1/comments → cria um novo comentário
    if (req.method === "POST") {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const limit = rateLimit(ip);

        if (!limit.allowed) {
            return res.status(429).json({
                error: `Muitas requisições. Tente novamente em ${limit.retryAfter} segundos.`,
            });
        }

        const { post_id, author_name, author_email, content } = req.body;

        if (!post_id || !author_name || !author_email || !content) {
            return res.status(400).json({
                error: "post_id, author_name, author_email e content são obrigatórios",
            });
        }

        if (content.trim().length < 3) {
            return res.status(400).json({
                error: "O comentário deve ter pelo menos 3 caracteres.",
            });
        }

        try {
            const comment = await CommentModel.create({ post_id, author_name, author_email, content });
            return res.status(201).json(comment);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar comentário" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
