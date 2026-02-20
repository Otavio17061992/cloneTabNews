import Link from "next/link";
import { Github, Linkedin, Mail, Code2, Heart } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <Code2 size={20} />
                            <span>João.dev</span>
                        </Link>
                        <p className={styles.tagline}>
                            Desenvolvendo soluções com propósito há 4 anos.
                        </p>
                        <div className={styles.socials}>
                            <a
                                href="https://github.com/joaomesquita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://linkedin.com/in/joaomesquita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="mailto:joao@email.com"
                                className={styles.socialLink}
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.columns}>
                        <div className={styles.column}>
                            <h4 className={styles.colTitle}>Navegação</h4>
                            <ul>
                                <li><Link href="/" className={styles.footerLink}>Home</Link></li>
                                <li><Link href="/projects" className={styles.footerLink}>Projetos</Link></li>
                                <li><Link href="/community" className={styles.footerLink}>Comunidade</Link></li>
                                <li><Link href="/contact" className={styles.footerLink}>Contato</Link></li>
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h4 className={styles.colTitle}>Comunidade</h4>
                            <ul>
                                <li><Link href="/community?category=Frontend" className={styles.footerLink}>Frontend</Link></li>
                                <li><Link href="/community?category=Backend" className={styles.footerLink}>Backend</Link></li>
                                <li><Link href="/community?category=DevOps" className={styles.footerLink}>DevOps</Link></li>
                                <li><Link href="/community?category=Carreira" className={styles.footerLink}>Carreira</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>
                        © {new Date().getFullYear()} João Mesquita. Feito com{" "}
                        <Heart size={14} className={styles.heart} /> em Next.js + PostgreSQL
                    </p>
                </div>
            </div>
        </footer>
    );
}
