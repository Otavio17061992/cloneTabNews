import Link from "next/link";
import { MessageSquare, Tag, Clock } from "lucide-react";
import styles from "./PostCard.module.css";

function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "agora mesmo";
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    return `${Math.floor(diff / 86400)}d atrás`;
}

export default function PostCard({ post }) {
    const { id, title, content, category, author_name, created_at, comment_count = 0 } = post;

    return (
        <div className={`card ${styles.card}`}>
            <div className={styles.meta}>
                <span className="badge badge-category">
                    <Tag size={10} /> {category}
                </span>
                <span className={styles.time}>
                    <Clock size={12} /> {timeAgo(created_at)}
                </span>
            </div>

            <Link href={`/community/${id}`} className={styles.title}>
                {title}
            </Link>

            <p className={styles.excerpt}>{content}</p>

            <div className={styles.footer}>
                <span className={styles.author}>{author_name}</span>
                <span className={styles.comments}>
                    <MessageSquare size={14} />
                    {comment_count} comentário{comment_count !== 1 ? "s" : ""}
                </span>
            </div>
        </div>
    );
}
