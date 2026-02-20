import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projetos" },
    { href: "/community", label: "Comunidade" },
    { href: "/contact", label: "Contato" },
];

export default function Navbar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    <Code2 size={22} />
                    <span>João.dev</span>
                </Link>

                <ul className={styles.links}>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`${styles.link} ${router.pathname === link.href ? styles.active : ""}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={styles.actions}>
                    <Link href="/contact" className="btn btn-primary" style={{ padding: "0.55rem 1.2rem", fontSize: "0.85rem" }}>
                        Fale comigo
                    </Link>
                </div>

                <button
                    className={styles.menuBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {menuOpen && (
                <div className={styles.mobileMenu}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.mobileLink} ${router.pathname === link.href ? styles.activeMobile : ""}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="btn btn-primary"
                        onClick={() => setMenuOpen(false)}
                    >
                        Fale comigo
                    </Link>
                </div>
            )}
        </header>
    );
}
