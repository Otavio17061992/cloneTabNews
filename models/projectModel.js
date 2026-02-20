import database from "../Infra/database.js";

const ProjectModel = {
    async getAll() {
        const result = await database.query(
            "SELECT * FROM projects ORDER BY featured DESC, created_at DESC"
        );
        return result.rows;
    },

    async getById(id) {
        const result = await database.query({
            text: "SELECT * FROM projects WHERE id = $1",
            values: [id],
        });
        return result.rows[0] || null;
    },

    async create({ title, description, tech_stack = [], image_url, github_url, demo_url, featured = false }) {
        const result = await database.query({
            text: `INSERT INTO projects (title, description, tech_stack, image_url, github_url, demo_url, featured)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            values: [title, description, tech_stack, image_url, github_url, demo_url, featured],
        });
        return result.rows[0];
    },
};

export default ProjectModel;
