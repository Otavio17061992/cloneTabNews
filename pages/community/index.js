import { useState } from "react";
import Link from "next/link";
import { Search, Tag, Plus, Layers } from "lucide-react";
import PostCard from "../../components/PostCard";
import styles from "./community.module.css";

const CATEGORIES = ["Todos", "Frontend", "Backend", "DevOps", "Carreira", "Mobile", "IA"];

export default function CommunityPage({ posts = [] }) {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [showForm, setShowForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", content: "", category: "Frontend", author_name: "" });
    const [loading, setLoading] = useState(false);
    const [localPosts, setLocalPosts] = useState(posts);

    const filtered = localPosts.filter((p) => {
        const matchSearch =
            !search ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.content.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory === "Todos" || p.category === activeCategory;
        return matchSearch && matchCat;
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/v1/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });
            if (res.ok) {
                const created = await res.json();
                setLocalPosts((prev) => [created.post, ...prev]);
                setNewPost({ title: "", content: "", category: "Frontend", author_name: "" });
                setShowForm(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={styles.pageHeader}>
                <div className="glow-orb glow-orb-1" />
                <div className="container">
                    <span className="section-label"><Layers size={12} /> Comunidade</span>
                    <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Hub de Devs & Recrutadores</h1>
                    <p className="section-description">
                        Compartilhe conhecimento, dicas de carreira, tutoriais e muito mais.
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => setShowForm(!showForm)}>
                        <Plus size={16} /> {showForm ? "Cancelar" : "Novo Post"}
                    </button>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* Formulário de novo post */}
                    {showForm && (
                        <div className={`card ${styles.newPostForm}`}>
                            <h3>Criar novo post</h3>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formRow}>
                                    <div className="form-group">
                                        <label className="form-label">Título</label>
                                        <input className="form-input" type="text" placeholder="Título do post..." value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Seu nome</label>
                                        <input className="form-input" type="text" placeholder="Seu nome" value={newPost.author_name} onChange={e => setNewPost({ ...newPost, author_name: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Categoria</label>
                                    <select className="form-input" value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })}>
                                        {CATEGORIES.filter(c => c !== "Todos").map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Conteúdo</label>
                                    <textarea className="form-textarea" placeholder="Escreva seu post aqui..." value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} required style={{ minHeight: "180px" }} />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? "Publicando..." : "Publicar Post"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Busca + Filtros */}
                    <div className={styles.controls}>
                        <div className={styles.searchWrapper}>
                            <Search size={16} className={styles.searchIcon} />
                            <input className={`form-input ${styles.searchInput}`} type="text" placeholder="Buscar posts..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div className={styles.categories}>
                            <Tag size={15} style={{ color: "var(--text-muted)" }} />
                            {CATEGORIES.map(cat => (
                                <button key={cat} className={`btn ${activeCategory === cat ? "btn-primary" : "btn-ghost"}`} style={{ padding: "0.4rem 0.875rem", fontSize: "0.82rem" }} onClick={() => setActiveCategory(cat)}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Posts */}
                    {filtered.length > 0 ? (
                        <div className="grid-3">
                            {filtered.map(post => <PostCard key={post.id} post={post} />)}
                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <Layers size={32} opacity={0.3} />
                            <p>Nenhum post encontrado.</p>
                            <button className="btn btn-ghost" onClick={() => { setSearch(""); setActiveCategory("Todos"); }}>
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${base}/api/v1/posts`);
        const data = res.ok ? await res.json() : { posts: [] };
        return { props: { posts: data.posts || [], title: "Comunidade" } };
    } catch {
        return { props: { posts: [], title: "Comunidade" } };
    }
}
