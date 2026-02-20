import database from "../Infra/database.js";

const PostModel = {
    async getAll({ page = 1, limit = 12, includeUnapproved = false } = {}) {
        const offset = (page - 1) * limit;

        let baseQuery = "FROM posts p";
        if (!includeUnapproved) {
            baseQuery += " WHERE p.approved = true";
        }

        const result = await database.query({
            text: `SELECT p.*,
               (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id AND c.approved = true)::int AS comment_count
             ${baseQuery}
             ORDER BY p.created_at DESC
             LIMIT $1 OFFSET $2`,
            values: [limit, offset],
        });

        let countQuery = "SELECT COUNT(*) FROM posts";
        if (!includeUnapproved) {
            countQuery += " WHERE approved = true";
        }
        const countResult = await database.query(countQuery);
        const total = parseInt(countResult.rows[0].count);

        return {
            posts: result.rows,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    },

    async getById(id) {
        const result = await database.query({
            text: "SELECT * FROM posts WHERE id = $1",
            values: [id],
        });
        return result.rows[0] || null;
    },

    async create({ title, content, category = "Geral", image_url, author_name = "Anônimo" }) {
        const result = await database.query({
            text: `INSERT INTO posts (title, content, category, image_url, author_name)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            values: [title, content, category, image_url, author_name],
        });
        return result.rows[0];
    },

    async approve(postId) {
        const result = await database.query({
            text: "UPDATE posts SET approved = true WHERE id = $1 RETURNING *",
            values: [postId],
        });
        return result.rows[0];
    },
};

export default PostModel;
