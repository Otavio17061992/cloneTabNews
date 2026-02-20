import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code2,
  Server,
  Database,
  Globe,
  Terminal,
  Layers,
  ChevronDown,
} from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import PostCard from "../components/PostCard";
import styles from "./index.module.css";

const skills = [
  { icon: <Globe size={22} />, name: "Frontend", items: ["React", "Next.js", "TypeScript", "CSS3"] },
  { icon: <Server size={22} />, name: "Backend", items: ["Node.js", "Express", "REST APIs", "Jest"] },
  { icon: <Database size={22} />, name: "Banco de Dados", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { icon: <Layers size={22} />, name: "DevOps", items: ["Docker", "Git", "GitHub Actions", "Linux"] },
];

const experiences = [
  { year: "2024 – Atual", role: "Dev Full-Stack", company: "Projetos Freelance", desc: "Desenvolvimento de aplicações web completas para clientes, desde o backend com Node.js até o frontend com React/Next.js." },
  { year: "2023 – 2024", role: "Dev Backend", company: "Startup Tech", desc: "APIs RESTful com Node.js e PostgreSQL, integração de serviços externos e otimização de performance." },
  { year: "2022 – 2023", role: "Dev Junior", company: "Agência Digital", desc: "Desenvolvimento de landing pages, sistemas web com React e manutenção de bancos de dados." },
];

export default function Home({ featuredProjects = [], recentPosts = [] }) {
  const [typed, setTyped] = useState("");
  const fullText = "João Mesquita";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="container">
          <div className={styles.heroContent}>
            <span className="section-label">
              <Terminal size={12} /> Disponível para projetos
            </span>

            <h1 className={styles.heroTitle}>
              Olá, sou{" "}
              <span className="gradient-text">
                {typed}
                <span className={styles.cursor}>|</span>
              </span>
            </h1>

            <p className={styles.heroSub}>
              Desenvolvedor Full-Stack com <strong>4 anos de experiência</strong>. Crio soluções digitais
              robustas e bem projetadas — do banco de dados à interface.
            </p>

            <div className={styles.heroActions}>
              <Link href="/projects" className="btn btn-primary">
                Ver meus projetos <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Entre em contato
              </Link>
            </div>

            <div className={styles.socials}>
              <a
                href="https://github.com/joaomesquita"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/joaomesquita"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a href="mailto:joao@email.com" className={styles.socialBtn} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <span className={styles.dot} style={{ background: "#ef4444" }} />
                <span className={styles.dot} style={{ background: "#f59e0b" }} />
                <span className={styles.dot} style={{ background: "#10b981" }} />
                <span className={styles.fileName}>joao.dev</span>
              </div>
              <pre className={styles.codeBody}>{`const dev = {
  name: "João Mesquita",
  experience: "4 anos",
  stack: [
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker"
  ],
  status: "disponível 🚀"
};`}</pre>
            </div>
          </div>
        </div>

        <a href="#about" className={styles.scrollDown}>
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ─── Sobre mim ─── */}
      <section id="about" className={`section ${styles.aboutSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Quem sou eu</span>
            <h2 className="section-title">4 anos construindo o futuro</h2>
            <p className="section-description">
              Apaixonado por código limpo, boas práticas e soluções que realmente funcionam.
            </p>
          </div>

          <div className={styles.experienceTimeline}>
            {experiences.map((exp, i) => (
              <div key={i} className={styles.expItem}>
                <div className={styles.expYear}>{exp.year}</div>
                <div className={styles.expDot} />
                <div className={styles.expContent}>
                  <strong>{exp.role}</strong>
                  <span className={styles.expCompany}>{exp.company}</span>
                  <p>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section className={`section ${styles.skillsSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <Code2 size={12} /> Stack
            </span>
            <h2 className="section-title">Tecnologias & Habilidades</h2>
          </div>

          <div className="grid-3" style={{ gap: "1.5rem" }}>
            {skills.map((skill) => (
              <div key={skill.name} className={`card ${styles.skillCard}`}>
                <div className={styles.skillIcon}>{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className={styles.skillTags}>
                  {skill.items.map((item) => (
                    <span key={item} className="badge badge-tech">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projetos em destaque ─── */}
      <section className={`section ${styles.projectsSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portfólio</span>
            <h2 className="section-title">Projetos em Destaque</h2>
            <p className="section-description">
              Uma seleção dos projetos que mais me orgulho.
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid-3">
              {featuredProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Projetos sendo carregados... Certifique-se de que o banco de dados está rodando.</p>
            </div>
          )}

          <div className={styles.seeAll}>
            <Link href="/projects" className="btn btn-outline">
              Ver todos os projetos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Posts Recentes ─── */}
      {recentPosts.length > 0 && (
        <section className={`section ${styles.postsSection}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Comunidade</span>
              <h2 className="section-title">Posts Recentes</h2>
              <p className="section-description">
                Artigos e discussões sobre tecnologia para devs e recrutadores.
              </p>
            </div>

            <div className="grid-3">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className={styles.seeAll}>
              <Link href="/community" className="btn btn-outline">
                Ver comunidade <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Contato ─── */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className="glow-orb" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }} />
            <div className={styles.ctaContent}>
              <span className="section-label">Vamos trabalhar juntos?</span>
              <h2>Entre em contato comigo</h2>
              <p>
                Pode ser um projeto freelance, uma oportunidade de emprego ou apenas um papo sobre tecnologia.
                Estou disponível!
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/contact" className="btn btn-primary">
                  <Mail size={16} /> Enviar mensagem
                </Link>
                <a
                  href="https://linkedin.com/in/joaomesquita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const [projRes, postsRes] = await Promise.all([
      fetch(`${base}/api/v1/projects`),
      fetch(`${base}/api/v1/posts`),
    ]);

    const projData = projRes.ok ? await projRes.json() : { projects: [] };
    const postsData = postsRes.ok ? await postsRes.json() : { posts: [] };

    return {
      props: {
        featuredProjects: (projData.projects || []).filter((p) => p.featured).slice(0, 3),
        recentPosts: (postsData.posts || []).slice(0, 3),
      },
    };
  } catch {
    return { props: { featuredProjects: [], recentPosts: [] } };
  }
}
