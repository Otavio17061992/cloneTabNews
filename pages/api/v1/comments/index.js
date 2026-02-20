import database from "../../../../Infra/database";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { post_id } = req.query;
        if (!post_id) {
            return res.status(400).json({ error: "post_id é obrigatório" });
        }
        try {
            const result = await database.query({
                text: "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC",
                values: [post_id],
            });
            return res.status(200).json({ comments: result.rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar comentários" });
        }
    }

    if (req.method === "POST") {
        const { post_id, author_name, author_email, content } = req.body;
        if (!post_id || !author_name || !author_email || !content) {
            return res.status(400).json({ error: "post_id, author_name, author_email e content são obrigatórios" });
        }
        try {
            const result = await database.query({
                text: `INSERT INTO comments (post_id, author_name, author_email, content)
               VALUES ($1, $2, $3, $4) RETURNING *`,
                values: [post_id, author_name, author_email, content],
            });
            return res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar comentário" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
