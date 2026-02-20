import ProjectModel from "../../../../models/projectModel.js";

export default async function handler(req, res) {
    const { id } = req.query;

    // GET /api/v1/projects/:id → busca projeto por ID
    if (req.method === "GET") {
        try {
            const project = await ProjectModel.getById(id);
            if (!project) {
                return res.status(404).json({ error: "Projeto não encontrado" });
            }
            return res.status(200).json({ project });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar projeto" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
