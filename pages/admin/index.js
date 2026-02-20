import { useState } from "react";
import { Lock, Check, Clock, AlertCircle } from "lucide-react";
import styles from "./index.module.css";

export default function AdminDashboard() {
    const [secret, setSecret] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pendingPosts, setPendingPosts] = useState([]);
    const [pendingComments, setPendingComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Tenta buscar posts pendentes para validar a senha
            const resPosts = await fetch(`/api/v1/posts?status=pending&admin_secret=${secret}`);

            if (!resPosts.ok) {
                if (resPosts.status === 401) {
                    throw new Error("Senha secreta incorreta");
                }
                throw new Error("Erro ao validar administrador");
            }

            const dataPosts = await resPosts.json();

            // Se passou da senha, busca também os comentários
            const resComments = await fetch(`/api/v1/comments?status=pending&admin_secret=${secret}`);
            const dataComments = await resComments.json();

            setPendingPosts(dataPosts.posts || []);
            setPendingComments(dataComments.comments || []);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleApprovePost(id) {
        try {
            const res = await fetch(`/api/v1/posts/${id}/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ admin_secret: secret })
            });
            if (res.ok) {
                setPendingPosts(prev => prev.filter(p => p.id !== id));
            } else {
                alert("Erro ao aprovar post");
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function handleApproveComment(id) {
        try {
            const res = await fetch(`/api/v1/comments/${id}/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ admin_secret: secret })
            });
            if (res.ok) {
                setPendingComments(prev => prev.filter(c => c.id !== id));
            } else {
                alert("Erro ao aprovar comentário");
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.pageHeader}>
                <div className="container">
                    <div className={styles.authContainer}>
                        <Lock size={48} style={{ color: "var(--primary)", margin: "0 auto 1rem" }} />
                        <h2>Acesso Restrito</h2>
                        <p className="text-muted">Área administrativa</p>

                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                className={`form-input ${styles.secretInput}`}
                                placeholder="Digite a senha secreta..."
                                value={secret}
                                onChange={e => setSecret(e.target.value)}
                                required
                            />
                            {error && (
                                <div style={{ color: "var(--error)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                                    <AlertCircle size={14} style={{ display: "inline", verticalAlign: "text-bottom", marginRight: "4px" }} />
                                    {error}
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
                                {loading ? "Verificando..." : "Entrar"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: "6rem", minHeight: "80vh" }}>
            <div className={styles.dashboardContainer}>
                <h2>Painel de Aprovações</h2>
                <p className="text-muted">Revise o conteúdo enviado pela comunidade antes de ir ao ar.</p>

                <div style={{ marginTop: "3rem" }}>
                    <h3>Posts Pendentes ({pendingPosts.length})</h3>
                    {pendingPosts.length === 0 ? (
                        <div className={styles.emptyState}>
                            Nenhum post aguardando aprovação.
                        </div>
                    ) : (
                        <div className={styles.cardList}>
                            {pendingPosts.map(post => (
                                <div key={post.id} className={styles.adminCard}>
                                    <div className={styles.cardContent}>
                                        <h4>{post.title}</h4>
                                        <p>{post.content.substring(0, 150)}{post.content.length > 150 ? "..." : ""}</p>
                                        <div className={styles.cardFooter}>
                                            <span>Por: {post.author_name}</span>
                                            <span>|</span>
                                            <span>Categoria: {post.category}</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardActions}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleApprovePost(post.id)}
                                            style={{ backgroundColor: "var(--success)", borderColor: "var(--success)" }}
                                        >
                                            <Check size={16} /> Aprovar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ marginTop: "4rem" }}>
                    <h3>Comentários Pendentes ({pendingComments.length})</h3>
                    {pendingComments.length === 0 ? (
                        <div className={styles.emptyState}>
                            Nenhum comentário aguardando aprovação.
                        </div>
                    ) : (
                        <div className={styles.cardList}>
                            {pendingComments.map(comment => (
                                <div key={comment.id} className={styles.adminCard}>
                                    <div className={styles.cardContent}>
                                        <p>"{comment.content}"</p>
                                        <div className={styles.cardFooter}>
                                            <span>Por: {comment.author_name}</span>
                                            <span>|</span>
                                            <span>Post ID: {comment.post_id}</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardActions}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleApproveComment(comment.id)}
                                            style={{ backgroundColor: "var(--success)", borderColor: "var(--success)" }}
                                        >
                                            <Check size={16} /> Aprovar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
