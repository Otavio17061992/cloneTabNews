import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus } from "lucide-react";
import ProjectCard from "../../components/ProjectCard";
import styles from "./projects.module.css";

const CATEGORIES = ["Todos", "Next.js", "React", "Node.js", "Python", "PostgreSQL", "Docker"];

export default function ProjectsPage({ projects = [] }) {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("Todos");

    const filtered = projects.filter((p) => {
        const matchSearch =
            !search ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            activeFilter === "Todos" ||
            (p.tech_stack || []).some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()));
        return matchSearch && matchFilter;
    });

    return (
        <>
            <div className={styles.pageHeader}>
                <div className="glow-orb glow-orb-1" />
                <div className="container">
                    <span className="section-label">Portfólio</span>
                    <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Meus Projetos</h1>
                    <p className="section-description">
                        Uma coleção de projetos que desenvolvi ao longo de 4 anos como desenvolvedor.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* Busca + Filtros */}
                    <div className={styles.controls}>
                        <div className={styles.searchWrapper}>
                            <Search size={16} className={styles.searchIcon} />
                            <input
                                className={`form-input ${styles.searchInput}`}
                                type="text"
                                placeholder="Buscar projeto..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className={styles.filters}>
                            <Filter size={16} style={{ color: "var(--text-muted)" }} />
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    className={`btn ${activeFilter === cat ? "btn-primary" : "btn-ghost"}`}
                                    style={{ padding: "0.4rem 1rem", fontSize: "0.82rem" }}
                                    onClick={() => setActiveFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid de projetos */}
                    {filtered.length > 0 ? (
                        <>
                            <p className={styles.count}>
                                {filtered.length} projeto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                            </p>
                            <div className="grid-3">
                                {filtered.map((p) => (
                                    <ProjectCard key={p.id} project={p} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.empty}>
                            <p>Nenhum projeto encontrado com esses filtros.</p>
                            <button className="btn btn-ghost" onClick={() => { setSearch(""); setActiveFilter("Todos"); }}>
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
        const res = await fetch(`${base}/api/v1/projects`);
        const data = res.ok ? await res.json() : { projects: [] };
        return { props: { projects: data.projects || [], title: "Projetos", description: "Portfólio de projetos de João Mesquita" } };
    } catch {
        return { props: { projects: [], title: "Projetos" } };
    }
}
