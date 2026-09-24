import CommentModel from "../../../../../models/commentModel.js";
import { requireAdmin } from "../../../../../Infra/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) return;

  const { id } = req.query;

  try {
    const comment = await CommentModel.approve(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res
      .status(200)
      .json({ message: "Comment approved successfully", comment });
  } catch (error) {
    console.error("Error approving comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
