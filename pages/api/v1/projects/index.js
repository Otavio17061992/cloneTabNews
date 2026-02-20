import database from "../../../../Infra/database";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const result = await database.query(
                "SELECT * FROM projects ORDER BY featured DESC, created_at DESC"
            );
            return res.status(200).json({ projects: result.rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar projetos" });
        }
    }

    if (req.method === "POST") {
        const { title, description, tech_stack = [], image_url, github_url, demo_url, featured = false } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: "title e description são obrigatórios" });
        }
        try {
            const result = await database.query({
                text: `INSERT INTO projects (title, description, tech_stack, image_url, github_url, demo_url, featured)
               VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                values: [title, description, tech_stack, image_url, github_url, demo_url, featured],
            });
            return res.status(201).json({ project: result.rows[0] });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar projeto" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
