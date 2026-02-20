import Link from "next/link";
import { Github, ExternalLink, Star } from "lucide-react";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
    const { id, title, description, tech_stack = [], image_url, github_url, demo_url, featured } = project;

    return (
        <div className={`card ${styles.card}`}>
            {image_url ? (
                <div className={styles.imageWrapper}>
                    <img src={image_url} alt={title} className={styles.image} />
                    {featured && (
                        <span className={styles.featuredBadge}>
                            <Star size={12} fill="currentColor" /> Destaque
                        </span>
                    )}
                </div>
            ) : (
                <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderIcon}>{"</>"}</span>
                    {featured && (
                        <span className={styles.featuredBadge}>
                            <Star size={12} fill="currentColor" /> Destaque
                        </span>
                    )}
                </div>
            )}

            <div className={styles.content}>
                <Link href={`/projects/${id}`} className={styles.title}>
                    {title}
                </Link>
                <p className={styles.description}>{description}</p>

                {tech_stack.length > 0 && (
                    <div className={styles.tags}>
                        {tech_stack.slice(0, 4).map((tech) => (
                            <span key={tech} className="badge badge-tech">
                                {tech}
                            </span>
                        ))}
                        {tech_stack.length > 4 && (
                            <span className="badge badge-tech">+{tech_stack.length - 4}</span>
                        )}
                    </div>
                )}

                <div className={styles.links}>
                    {github_url && (
                        <a
                            href={github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost"
                            style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
                        >
                            <Github size={15} /> GitHub
                        </a>
                    )}
                    {demo_url && (
                        <a
                            href={demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
                        >
                            <ExternalLink size={15} /> Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
