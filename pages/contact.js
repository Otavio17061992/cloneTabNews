import { useState } from "react";
import { Mail, Github, Linkedin, Send, CheckCircle2, MapPin, Clock } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/v1/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSent(true);
                setForm({ name: "", email: "", message: "" });
            } else {
                throw new Error("Não foi possível enviar a mensagem");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={styles.pageHeader}>
                <div className="glow-orb glow-orb-1" />
                <div className="container">
                    <span className="section-label">Fale comigo</span>
                    <h1 className="section-title" style={{ marginTop: "0.5rem" }}>Entre em Contato</h1>
                    <p className="section-description">
                        Tem um projeto em mente? Ou só quer trocar uma ideia sobre tecnologia? Me chama!
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className={styles.layout}>
                        {/* Info Cards */}
                        <div className={styles.info}>
                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}><Mail size={22} /></div>
                                <div>
                                    <h3>E-mail</h3>
                                    <a href="mailto:[EMAIL_ADDRESS]" className={styles.infoLink}>[EMAIL_ADDRESS]</a>
                                </div>
                            </div>

                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}><Github size={22} /></div>
                                <div>
                                    <h3>GitHub</h3>
                                    <a href="https://github.com/Otavio17061992" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                        @Otavio17061992
                                    </a>
                                </div>
                            </div>

                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}><Linkedin size={22} /></div>
                                <div>
                                    <h3>LinkedIn</h3>
                                    <a href="https://linkedin.com/in/otavio17061992" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                                        Otávio Mesquita
                                    </a>
                                </div>
                            </div>

                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}><MapPin size={22} /></div>
                                <div>
                                    <h3>Localização</h3>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Brasil 🇧🇷</p>
                                </div>
                            </div>

                            <div className={`card ${styles.infoCard}`}>
                                <div className={styles.infoIcon}><Clock size={22} /></div>
                                <div>
                                    <h3>Disponibilidade</h3>
                                    <p style={{ color: "var(--success)", fontSize: "0.9rem", fontWeight: 600 }}>
                                        ✅ Disponível para Colabs
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Formulário */}
                        <div className={styles.formWrapper}>
                            {sent ? (
                                <div className={styles.successState}>
                                    <CheckCircle2 size={48} color="var(--success)" />
                                    <h3>Mensagem enviada!</h3>
                                    <p>Obrigado pelo contato. Responderei em breve!</p>
                                    <button className="btn btn-outline" onClick={() => setSent(false)}>
                                        Enviar outra mensagem
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <h3 className={styles.formTitle}>Enviar mensagem</h3>

                                    {error && (
                                        <div className={styles.errorMsg}>{error}</div>
                                    )}

                                    <div className={styles.row}>
                                        <div className="form-group">
                                            <label className="form-label">Nome</label>
                                            <input className="form-input" type="text" placeholder="Seu nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">E-mail</label>
                                            <input className="form-input" type="email" placeholder="seu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Mensagem</label>
                                        <textarea
                                            className="form-textarea"
                                            placeholder="Olá João, gostaria de conversar sobre..."
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                            required
                                            style={{ minHeight: "200px" }}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
                                        <Send size={16} />
                                        {loading ? "Enviando..." : "Enviar mensagem"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps() {
    return { props: { title: "Contato", description: "Entre em contato com João Mesquita, desenvolvedor full-stack." } };
}
