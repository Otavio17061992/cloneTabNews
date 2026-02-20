import ProjectModel from "../../../../models/projectModel.js";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const projects = await ProjectModel.getAll();
            return res.status(200).json({ projects });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar projetos" });
        }
    }

    // POST /api/v1/projects → cria um novo projeto
    if (req.method === "POST") {
        const { title, description, tech_stack, image_url, github_url, demo_url, featured } = req.body;

        // Validação (equivale ao ModelState.IsValid do .NET)
        if (!title || !description) {
            return res.status(400).json({ error: "title e description são obrigatórios" });
        }

        try {
            const project = await ProjectModel.create({ title, description, tech_stack, image_url, github_url, demo_url, featured });
            return res.status(201).json({ project });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao criar projeto" });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
}
