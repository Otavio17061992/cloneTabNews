import database from "../../../../Infra/database";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const page = parseInt(req.query.page || "1");
            const limit = parseInt(req.query.limit || "12");
            const offset = (page - 1) * limit;

            const result = await database.query({
                text: `SELECT p.*, 
               (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id)::int AS comment_count
               FROM posts p 
               ORDER BY p.created_at DESC 
               LIMIT $1 OFFSET $2`,
                values: [limit, offset],
            });

            const countResult = await database.query("SELECT COUNT(*) FROM posts");
            const total = parseInt(countResult.rows[0].count);

            return res.status(200).json({
                posts: result.rows,
                pagination: { page, limit, total, pages: Math.ceil(total / limit) },
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar posts" });
        }
    }

    if (req.method === "POST") {
        const { title, content, category = "Geral", image_url, author_name = "Anônimo" } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "title e content são obrigatórios" });
        }
        try {
            const result = await database.query({
                text: `INSERT INTO posts (title, content, category, image_url, author_name)
               VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                values: [title, content, category, image_url, author_name],
            });
            return res.status(201).json({ post: result.rows[0] });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar post" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
