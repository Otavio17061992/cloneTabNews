import Link from "next/link";
import { Github, Linkedin, Mail, Code2, Heart, Instagram } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <Code2 size={20} />
                            <span>CodaFoFo.ocx</span>
                        </Link>
                        <p className={styles.tagline}>
                            Desenvolvendo soluções com propósito  alguns anos
                        </p>
                        <div className={styles.socials}>
                            <a
                                href="https://github.com/Otavio17061992"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://linkedin.com/in/otavio17061992"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/codafofo.msx/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
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
                        © {new Date().getFullYear()} João Mesquita. Feito por mim
                        com Next.js + PostgreSQL
                    </p>
                </div>
            </div>
        </footer>
    );
}
