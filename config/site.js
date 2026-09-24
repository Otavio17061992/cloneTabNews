// Configurações globais do site: identidade, contato e flags de seções.

const siteConfig = {
    name: "João Mesquita",
    role: "Desenvolvedor Backend .NET",
    get title() {
        return `${this.name} — ${this.role}`;
    },
    description:
        "Portfólio de João Mesquita, Desenvolvedor Backend .NET / C# com experiência em ASP.NET, SQL Server e Azure DevOps.",

    contactEmail: "[PREENCHER]",
    linkedinUrl: "[PREENCHER — URL do meu LinkedIn]",
    contactMessage:
        "Estou aberto a oportunidades como Desenvolvedor Backend .NET. Se quiser conversar sobre uma vaga, um projeto ou tecnologia, me chama!",
    resumeUrl: "/curriculo-joao-mesquita.pdf",

    // Exibe a seção "Posts Recentes" na home. A página /community continua acessível.
    showRecentPostsOnHome: false,
};

export default siteConfig;
