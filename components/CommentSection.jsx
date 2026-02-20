import { useState } from "react";
import { MessageSquare, Send, User, Mail, AlertCircle } from "lucide-react";
import styles from "./CommentSection.module.css";

function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "agora mesmo";
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    return `${Math.floor(diff / 86400)} dias atrás`;
}

export default function CommentSection({ postId, initialComments = [] }) {
    const [comments, setComments] = useState(initialComments);
    const [form, setForm] = useState({ author_name: "", author_email: "", content: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/v1/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, post_id: postId }),
            });

            if (!res.ok) throw new Error("Erro ao enviar comentário");
            const newComment = await res.json();
            setComments((prev) => [...prev, newComment]);
            setForm({ author_name: "", author_email: "", content: "" });
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={styles.section}>
            <h3 className={styles.heading}>
                <MessageSquare size={20} />
                Comentários ({comments.length})
            </h3>

            {comments.length === 0 ? (
                <div className={styles.empty}>
                    <MessageSquare size={32} opacity={0.3} />
                    <p>Seja o primeiro a comentar!</p>
                </div>
            ) : (
                <div className={styles.list}>
                    {comments.map((c) => (
                        <div key={c.id} className={styles.comment}>
                            <div className={styles.avatar}>
                                {c.author_name?.charAt(0).toUpperCase()}
                            </div>
                            <div className={styles.body}>
                                <div className={styles.commentMeta}>
                                    <strong className={styles.commentAuthor}>{c.author_name}</strong>
                                    <span className={styles.commentTime}>{timeAgo(c.created_at)}</span>
                                </div>
                                <p className={styles.commentContent}>{c.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.divider} />

            <div className={styles.formWrapper}>
                <h4 className={styles.formTitle}>Deixe seu comentário</h4>

                {success && (
                    <div className={styles.successMsg}>
                        ✅ Comentário enviado com sucesso!
                    </div>
                )}
                {error && (
                    <div className={styles.errorMsg}>
                        <AlertCircle size={15} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className="form-group">
                            <label className="form-label">
                                <User size={13} /> Nome
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Seu nome"
                                value={form.author_name}
                                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                <Mail size={13} /> E-mail
                            </label>
                            <input
                                className="form-input"
                                type="email"
                                placeholder="seu@email.com"
                                value={form.author_email}
                                onChange={(e) => setForm({ ...form, author_email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <MessageSquare size={13} /> Comentário
                        </label>
                        <textarea
                            className="form-textarea"
                            placeholder="Escreva seu comentário aqui..."
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        <Send size={16} />
                        {loading ? "Enviando..." : "Enviar Comentário"}
                    </button>
                </form>
            </div>
        </section>
    );
}
