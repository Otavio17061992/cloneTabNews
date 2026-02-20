import database from "../../../../Infra/database";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const result = await database.query({
                text: "SELECT * FROM projects WHERE id = $1",
                values: [id],
            });
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Projeto não encontrado" });
            }
            return res.status(200).json({ project: result.rows[0] });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar projeto" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
