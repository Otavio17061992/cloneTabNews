import { useEffect, useState, useRef } from "react";
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
  Instagram,
} from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import PostCard from "../components/PostCard";
import styles from "./index.module.css";

const skills = [
  { icon: <Globe size={22} />, name: "Frontend", items: ["React", "Next.js", "TypeScript", "CSS3"] },
  { icon: <Server size={22} />, name: "Backend", items: [".NET C# MVC", "Node.js", "REST APIs", "ASP.NET"] },
  { icon: <Database size={22} />, name: "Banco de Dados", items: ["SQL Server", "PostgreSQL", "MongoDB"] },
  { icon: <Layers size={22} />, name: "DevOps", items: ["Docker", "Git", "GitHub Actions", "Linux"] },
];

const experiences = [
  {
    year: "Jan 2025 – Atual",
    role: "Desenvolvedor de Software",
    company: "Geosaúde Gerenciadora",
    desc: "Desenvolvo e mantenho aplicações web com foco em performance e escalabilidade utilizando C# e Web Forms. Gestão de demandas com Azure DevOps, versionamento com Git, manipulação e otimização de dados com SQL Server.",
  },
  {
    year: "Nov 2023 – Jan 2025",
    role: "Analista de Aplicações",
    company: "Comerc Energia",
    desc: "Criação de aplicações com C#, Windows Forms e React Native. Análise de dados de consumo de energia, consultas SQL Server e gestão de projetos internos.",
  },
  {
    year: "Jun 2022 – Fev 2024",
    role: "Desenvolvedor de Software",
    company: "GESTAL Gestão de Energia",
    desc: "Criação de aplicações em C# + JS para otimizar tarefas, análise de consumo de energia elétrica, consultas SQL Server e testes na plataforma Smart Energy.",
  },
  {
    year: "Ago 2020 – Dez 2022",
    role: "Especialista em Suporte de TI",
    company: "Serasa Experian",
    desc: "Suporte técnico de 1ª e 2ª linha, diagnóstico e resolução de problemas complexos, manutenção de sistemas e redes, gestão de tickets e colaboração com equipes de desenvolvimento.",
  },
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

  const codeCardRef = useRef(null);

  useEffect(() => {
    const el = codeCardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.slideIn);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="section-label">
              <Terminal size={12} /> Disponível para projetos
            </span>

            <h1 className={styles.heroTitle}>
              Olá, sou{" "}
              <span style={{ color: "var(--accent)" }}>
                {typed}
                <span className={styles.cursor}>|</span>
              </span>
            </h1>

            <p className={styles.heroSub}>
              Especialista em <strong>.NET C# e SQL Server</strong> && tentando dominar o <strong>Next.js com PostgreSQL</strong>, automatizando o mundo
              antes que a IA decida fazer isso por mim. Aberto a freelas e colabs.
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
                href="https://github.com/Otavio17061992"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/otavio17061992"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/codafofo.msx/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.codeCard} ref={codeCardRef}>
              <div className={styles.codeHeader}>
                <span className={styles.dot} style={{ background: "#ef4444" }} />
                <span className={styles.dot} style={{ background: "#f59e0b" }} />
                <span className={styles.dot} style={{ background: "#10b981" }} />
                <span className={styles.fileName}>joao.dev</span>
              </div>
              <div className={styles.codeBody}>{`// C# 12 - Compact & Clean
var dev = new Pessoa {
  Name = "Otávio Mesquita",
  Role = "Software Developer",
  Stack = new[] {
    ".NET 8", "C#", "SQL Server",
    "Next.js", "PostgreSQL", "Docker"
  },
  Architecture = new[] {
    "Microservices", "Event-Driven",
    "Clean Arch", "Design Systems"
  },
  Status = "Automatizando o mundo..."
};`}</div>
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
          <div className={styles.aboutGrid}>
            {/* Foto */}
            <div className={styles.aboutPhoto}>
              <img
                src="https://github.com/Otavio17061992.png"
                alt="Otávio Mesquita"
                className={styles.photoImg}
              />
            </div>

            {/* Texto */}
            <div className={styles.aboutText}>
              <span className="section-label">Sobre mim</span>
              <h2 className="section-title" style={{ textAlign: "left", marginTop: "0.5rem" }}>
                Resolvendo problemas reais com código sólido
              </h2>
              <p style={{ marginTop: "0.75rem", lineHeight: "1.85", fontSize: "1rem" }}>
                Desenvolvedor especializado no ecossistema <strong>.NET</strong> (C#, ASP.NET Core).
                Minha trajetória inclui o desenvolvimento de soluções backend robustas, APIs RESTful
                e a otimização de bancos de dados SQL Server para aplicações de alta performance.
              </p>
              <p style={{ marginTop: "0.75rem", lineHeight: "1.85", fontSize: "1rem" }}>
                Possuo um olhar técnico diferenciado devido à minha base em microprocessadores
                <strong> ARM e Qualcomm</strong>, o que alimenta minha paixão por entender o
                funcionamento do software “por baixo dos panos”.
              </p>
              <p style={{ marginTop: "0.75rem", lineHeight: "1.85", fontSize: "1rem" }}>
                Proficiente em práticas modernas de DevOps utilizando
                <strong> Azure DevOps, Docker</strong> e pipelines de CI/CD para garantir entrega
                contínua e qualidade de código.
              </p>

              <div className={styles.experienceTimeline} style={{ marginTop: "2.5rem" }}>
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
            <div className={styles.ctaContent}>
              <span className="section-label">Vamos trabalhar juntos?</span>
              <h2>Entre em contato comigo</h2>
              <p>
                Tem um projeto para desenvolver, uma ideia para tirar do papel ou quer trocar
                uma ideia sobre tecnologia? Topo freelas e colaborações!
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/contact" className="btn btn-primary">
                  <Mail size={16} /> Enviar mensagem
                </Link>
                <a
                  href="https://linkedin.com/in/otavio17061992"
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
