/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    // Seed: projetos reais solicitados pelo usuário
    pgm.sql(`
    INSERT INTO projects (title, description, tech_stack, github_url, featured) VALUES
    ('KubernetsSimpleApplication', 'A simple application deployed using Kubernetes', ARRAY['Kubernetes', 'Docker'], 'https://github.com/Otavio17061992/KubernetsSimpleApplication', true),
    ('EduManager', 'Sistema de gerenciamento educacional e escolar', ARRAY['C#', '.NET', 'React'], 'https://github.com/Otavio17061992/EduManager', true),
    ('ProjetoHorasExtras', 'Aplicação para controle e cálculo de horas extras', ARRAY['C#', '.NET'], 'https://github.com/Otavio17061992/ProjetoHorasExtras', true),
    ('SalesWebMVC', 'Sistema de vendas web com ASP.NET Core MVC', ARRAY['C#', '.NET', 'MVC', 'MySQL'], 'https://github.com/Otavio17061992/SalesWebMVC', true)
  `);
};

exports.down = (pgm) => {
    // Delete os projetos inseridos nesta migration especificamente
    pgm.sql(`
    DELETE FROM projects WHERE github_url IN (
      'https://github.com/Otavio17061992/KubernetsSimpleApplication',
      'https://github.com/Otavio17061992/EduManager',
      'https://github.com/Otavio17061992/ProjetoHorasExtras',
      'https://github.com/Otavio17061992/SalesWebMVC'
    )
  `);
};
