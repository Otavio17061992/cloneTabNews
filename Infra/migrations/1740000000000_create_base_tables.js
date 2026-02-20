/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("projects", {
        id: {
            type: "serial",
            primaryKey: true,
        },
        title: {
            type: "varchar(255)",
            notNull: true,
        },
        description: {
            type: "text",
            notNull: true,
        },
        tech_stack: {
            type: "text[]",
            default: "{}",
        },
        image_url: {
            type: "text",
        },
        github_url: {
            type: "text",
        },
        demo_url: {
            type: "text",
        },
        featured: {
            type: "boolean",
            default: false,
        },
        created_at: {
            type: "timestamp with time zone",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createTable("posts", {
        id: {
            type: "serial",
            primaryKey: true,
        },
        title: {
            type: "varchar(255)",
            notNull: true,
        },
        content: {
            type: "text",
            notNull: true,
        },
        category: {
            type: "varchar(100)",
            notNull: true,
            default: "'Geral'",
        },
        image_url: {
            type: "text",
        },
        author_name: {
            type: "varchar(255)",
            notNull: true,
            default: "'Anônimo'",
        },
        created_at: {
            type: "timestamp with time zone",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "timestamp with time zone",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createTable("comments", {
        id: {
            type: "serial",
            primaryKey: true,
        },
        post_id: {
            type: "integer",
            notNull: true,
            references: '"posts"',
            onDelete: "CASCADE",
        },
        author_name: {
            type: "varchar(255)",
            notNull: true,
        },
        author_email: {
            type: "varchar(255)",
            notNull: true,
        },
        content: {
            type: "text",
            notNull: true,
        },
        created_at: {
            type: "timestamp with time zone",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    // Seed: projetos de exemplo
    pgm.sql(`
    INSERT INTO projects (title, description, tech_stack, github_url, featured) VALUES
    ('Dev Portfolio', 'Plataforma de portfólio e comunidade para devs e recrutadores', ARRAY['Next.js', 'PostgreSQL', 'Docker'], 'https://github.com/joaomesquita', true),
    ('API REST Node.js', 'API RESTful com autenticação JWT e banco de dados PostgreSQL', ARRAY['Node.js', 'Express', 'PostgreSQL', 'JWT'], 'https://github.com/joaomesquita', true)
  `);

    // Seed: posts de exemplo
    pgm.sql(`
    INSERT INTO posts (title, content, category, author_name) VALUES
    ('Como estruturar uma API REST com Next.js', 'Neste post vou mostrar como criar uma API REST robusta usando Next.js com PostgreSQL...', 'Backend', 'João Mesquita'),
    ('Dicas de CSS para interfaces modernas', 'Aprenda a usar variáveis CSS, gradientes e animações para criar UIs incríveis...', 'Frontend', 'João Mesquita'),
    ('Docker para Devs: Guia Rápido', 'Um guia prático para usar Docker no seu fluxo de desenvolvimento...', 'DevOps', 'João Mesquita')
  `);
};

exports.down = (pgm) => {
    pgm.dropTable("comments");
    pgm.dropTable("posts");
    pgm.dropTable("projects");
};
