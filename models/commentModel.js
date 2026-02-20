import database from "../Infra/database.js";

const CommentModel = {
    async getByPostId(postId, includeUnapproved = false) {
        let text = "SELECT * FROM comments WHERE post_id = $1";
        if (!includeUnapproved) {
            text += " AND approved = true";
        }
        text += " ORDER BY created_at ASC";

        const result = await database.query({
            text,
            values: [postId],
        });
        return result.rows;
    },

    async getAllPending() {
        const result = await database.query({
            text: "SELECT * FROM comments WHERE approved = false ORDER BY created_at ASC",
        });
        return result.rows;
    },

    async create({ post_id, author_name, author_email, content }) {
        const result = await database.query({
            text: `INSERT INTO comments (post_id, author_name, author_email, content)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            values: [post_id, author_name, author_email, content],
        });
        return result.rows[0];
    },

    async approve(commentId) {
        const result = await database.query({
            text: "UPDATE comments SET approved = true WHERE id = $1 RETURNING *",
            values: [commentId],
        });
        return result.rows[0];
    },
};

export default CommentModel;
