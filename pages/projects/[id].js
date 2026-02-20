import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react";
import styles from "./[id].module.css";

export default function ProjectDetail({ project }) {
    if (!project) {
        return (
            <div className="container" style={{ padding: "5rem 2rem", textAlign: "center" }}>
                <h1>Projeto não encontrado</h1>
                <Link href="/projects" className="btn btn-outline" style={{ marginTop: "1rem" }}>
                    ← Voltar aos projetos
                </Link>
            </div>
        );
    }

    const { title, description, tech_stack = [], image_url, github_url, demo_url, created_at } = project;

    return (
        <>
            <div className={styles.pageHeader}>
                <div className="glow-orb glow-orb-1" />
                <div className="container">
                    <Link href="/projects" className={styles.back}>
                        <ArrowLeft size={16} /> Todos os projetos
                    </Link>
                    <h1 style={{ marginTop: "1rem" }}>{title}</h1>
                    {created_at && (
                        <span className={styles.date}>
                            <Calendar size={13} />
                            {new Date(created_at).toLocaleDateString("pt-BR", { year: "numeric", month: "long" })}
                        </span>
                    )}
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className={styles.layout}>
                        <div className={styles.main}>
                            {image_url && (
                                <div className={styles.imageWrapper}>
                                    <img src={image_url} alt={title} className={styles.image} />
                                </div>
                            )}
                            <div className={styles.description}>
                                <h2>Sobre o projeto</h2>
                                <p>{description}</p>
                            </div>
                        </div>

                        <aside className={styles.sidebar}>
                            <div className="card">
                                <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Tech Stack</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                                    {tech_stack.map((tech) => (
                                        <span key={tech} className="badge badge-tech">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.links}>
                                {github_url && (
                                    <a href={github_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                                        <Github size={16} /> Ver no GitHub
                                    </a>
                                )}
                                {demo_url && (
                                    <a href={demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                                        <ExternalLink size={16} /> Acessar Demo
                                    </a>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${base}/api/v1/projects/${params.id}`);
        const data = res.ok ? await res.json() : null;
        return { props: { project: data?.project || null, title: data?.project?.title } };
    } catch {
        return { props: { project: null } };
    }
}
