import PostModel from "../../../../../models/postModel.js";
import { requireAdmin } from "../../../../../Infra/auth.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!requireAdmin(req, res)) return;

    const { id } = req.query;

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
