import PostModel from "../../../../models/postModel.js";

export default async function handler(req, res) {
    const { id } = req.query;

    // GET /api/v1/posts/:id → busca post por ID
    if (req.method === "GET") {
        try {
            const post = await PostModel.getById(id);
            if (!post) {
                return res.status(404).json({ error: "Post não encontrado" });
            }
            return res.status(200).json({ post });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar post" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
