import PostModel from "../../../../../models/postModel.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id } = req.query;
    const { admin_secret } = req.body;

    const SERVER_SECRET = process.env.ADMIN_SECRET || "12345";

    if (admin_secret !== SERVER_SECRET) {
        return res.status(401).json({ error: "Unauthorized: Invalid admin secret" });
    }

    try {
        const post = await PostModel.approve(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: "Post approved successfully", post });
    } catch (error) {
        console.error("Error approving post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
