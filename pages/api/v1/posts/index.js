import PostModel from "../../../../models/postModel.js";

export default async function handler(req, res) {
    // GET /api/v1/posts?page=1&limit=12
    if (req.method === "GET") {
        try {
            const page = parseInt(req.query.page || "1");
            const limit = parseInt(req.query.limit || "12");
            const data = await PostModel.getAll({ page, limit });
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar posts" });
        }
    }

    // POST /api/v1/posts → cria um novo post
    if (req.method === "POST") {
        const { title, content, category, image_url, author_name } = req.body;

        // Validação
        if (!title || !content) {
            return res.status(400).json({ error: "title e content são obrigatórios" });
        }

        try {
            const post = await PostModel.create({ title, content, category, image_url, author_name });
            return res.status(201).json({ post });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar post" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
