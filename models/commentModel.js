import database from "../Infra/database.js";

const CommentModel = {
    async getByPostId(postId) {
        const result = await database.query({
            text: "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC",
            values: [postId],
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
};

export default CommentModel;
