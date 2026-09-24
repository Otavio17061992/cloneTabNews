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
  FileDown,
} from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import PostCard from "../components/PostCard";
import siteConfig from "../config/site";
import styles from "./index.module.css";

const skills = [
  {
    icon: <Server size={22} />,
    name: "Backend",
    items: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "ASP.NET Web Forms",
      "Entity Framework",
      "REST APIs",
      "Node.js",
    ],
  },
  {
    icon: <Database size={22} />,
    name: "Banco de Dados",
    items: ["SQL Server", "PostgreSQL", "MongoDB"],
  },
  {
    icon: <Layers size={22} />,
    name: "DevOps",
    items: ["Azure DevOps", "Docker", "Git", "GitHub Actions", "Linux"],
  },
  {
    icon: <Globe size={22} />,
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "CSS3"],
  },
];

const experiences = [
  {
    year: "Jan 2025 – Atual",
    role: "Desenvolvedor de Software",
    company: "Geosaúde Gerenciadora",
    desc: "Desenvolvo e mantenho aplicações web com foco em performance e escalabilidade utilizando C# e Web Forms. Gestão de demandas com Azure DevOps, versionamento com Git, manipulação e otimização de dados com SQL Server.",
    result: "[PREENCHER — ex.: reduzi o tempo de X em Y%]",
  },
  {
    year: "Nov 2023 – Jan 2025",
    role: "Analista de Aplicações",
    company: "Comerc Energia",
    desc: "Criação de aplicações com C#, Windows Forms e React Native. Análise de dados de consumo de energia, consultas SQL Server e gestão de projetos internos.",
    result: "[PREENCHER]",
  },
  {
    year: "Jun 2022 – Fev 2024",
    role: "Desenvolvedor de Software",
    company: "GESTAL Gestão de Energia",
    desc: "Criação de aplicações em C# + JS para otimizar tarefas, análise de consumo de energia elétrica, consultas SQL Server e testes na plataforma Smart Energy.",
    result: "[PREENCHER]",
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
      { threshold: 0.1 },
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
              <Terminal size={12} /> Aberto a oportunidades
            </span>

            <h1 className={styles.heroTitle}>
              Olá, eu sou{" "}
              <span style={{ color: "var(--accent)" }}>
                {typed}
                <span className={styles.cursor}>|</span>
              </span>
            </h1>

            <p className={styles.heroSub}>
              Desenvolvedor Backend <strong>.NET / C#</strong> com experiência
              em <strong>ASP.NET, SQL Server e Azure DevOps</strong>. Construo
              APIs e sistemas que resolvem problemas reais de negócio, com foco
              em código limpo, performance e dados bem modelados.
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
                href={siteConfig.linkedinUrl}
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
                <span
                  className={styles.dot}
                  style={{ background: "#ef4444" }}
                />
                <span
                  className={styles.dot}
                  style={{ background: "#f59e0b" }}
                />
                <span
                  className={styles.dot}
                  style={{ background: "#10b981" }}
                />
                <span className={styles.fileName}>joao.dev</span>
              </div>
              <div className={styles.codeBody}>{`// C# 12 - Compact & Clean
var dev = new Pessoa {
  Name = "João Mesquita",
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
                alt="João Mesquita"
                className={styles.photoImg}
              />
            </div>

            {/* Texto */}
            <div className={styles.aboutText}>
              <span className="section-label">Sobre mim</span>
              <h2
                className="section-title"
                style={{ textAlign: "left", marginTop: "0.5rem" }}
              >
                Resolvendo problemas reais com código sólido
              </h2>
              <p
                style={{
                  marginTop: "0.75rem",
                  lineHeight: "1.85",
                  fontSize: "1rem",
                }}
              >
                Sou desenvolvedor focado no ecossistema <strong>.NET</strong>{" "}
                (C#, ASP.NET), com experiência construindo e mantendo aplicações
                web, APIs e integrações com <strong>SQL Server</strong> em
                ambientes corporativos dos setores de saúde e energia.
              </p>
              <p
                style={{
                  marginTop: "0.75rem",
                  lineHeight: "1.85",
                  fontSize: "1rem",
                }}
              >
                Comecei na área de TI pelo suporte técnico, o que me deu uma
                visão prática de como sistemas se comportam em produção e de
                como problemas afetam o usuário final. Hoje uso isso para
                escrever software mais confiável e fácil de manter.
              </p>
              <p
                style={{
                  marginTop: "0.75rem",
                  lineHeight: "1.85",
                  fontSize: "1rem",
                }}
              >
                No dia a dia trabalho com{" "}
                <strong>Azure DevOps, Git e Docker</strong>, e estou sempre
                estudando arquitetura de APIs, testes automatizados e boas
                práticas de backend.
              </p>

              <div
                className={styles.experienceTimeline}
                style={{ marginTop: "2.5rem" }}
              >
                {experiences.map((exp, i) => (
                  <div key={i} className={styles.expItem}>
                    <div className={styles.expYear}>{exp.year}</div>
                    <div className={styles.expDot} />
                    <div className={styles.expContent}>
                      <strong>{exp.role}</strong>
                      <span className={styles.expCompany}>{exp.company}</span>
                      <p>{exp.desc}</p>
                      {/* Oculta enquanto o resultado ainda for placeholder */}
                      {exp.result && !exp.result.includes("[PREENCHER") && (
                        <p>
                          <strong>Resultado:</strong> {exp.result}
                        </p>
                      )}
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
              <p>
                Projetos sendo carregados... Certifique-se de que o banco de
                dados está rodando.
              </p>
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
      {siteConfig.showRecentPostsOnHome && recentPosts.length > 0 && (
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
              <p>{siteConfig.contactMessage}</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className={styles.ctaEmail}
              >
                <Mail size={16} /> {siteConfig.contactEmail}
              </a>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Link href="/contact" className="btn btn-primary">
                  <Mail size={16} /> Enviar mensagem
                </Link>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FileDown size={16} /> Baixar currículo (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const host = context.req.headers.host;
    const protocol = host.includes("localhost") ? "http" : "https";
    const base = `${protocol}://${host}`;
    const [projRes, postsRes] = await Promise.all([
      fetch(`${base}/api/v1/projects`),
      siteConfig.showRecentPostsOnHome ? fetch(`${base}/api/v1/posts`) : null,
    ]);

    const projData = projRes.ok ? await projRes.json() : { projects: [] };
    const postsData = postsRes?.ok ? await postsRes.json() : { posts: [] };

    return {
      props: {
        // A API já ordena destaque primeiro; com um único destaque, completa com os mais recentes
        featuredProjects: (projData.projects || []).slice(0, 3),
        recentPosts: (postsData.posts || []).slice(0, 3),
      },
    };
  } catch {
    return { props: { featuredProjects: [], recentPosts: [] } };
  }
}
