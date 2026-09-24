/* eslint-disable camelcase */

// Atualiza o repositório dos projetos criados pela migration inicial,
// que apontavam para o perfil genérico do GitHub.
//
// ATENÇÃO: o build de produção roda as migrations. Enquanto houver
// [PREENCHER] abaixo, esta migration falha de propósito para não gravar
// o placeholder no banco.

exports.shorthands = undefined;

const GENERIC_URL = "https://github.com/Otavio17061992";

const DEV_PORTFOLIO_URL = "[PREENCHER — URL do repositório]";

// URL do repositório, ou null para remover o projeto do portfólio.
const API_REST_NODE_URL = "[PREENCHER — URL do repositório, ou null para remover]";

function assertFilled(...values) {
    const pending = values.filter((v) => typeof v === "string" && v.includes("[PREENCHER"));
    if (pending.length > 0) {
        throw new Error(`Migration com placeholders pendentes: ${pending.join(", ")}`);
    }
}

exports.up = (pgm) => {
    assertFilled(DEV_PORTFOLIO_URL, API_REST_NODE_URL);

    pgm.sql(`
    UPDATE projects SET github_url = '${DEV_PORTFOLIO_URL}'
    WHERE title = 'Dev Portfolio' AND github_url = '${GENERIC_URL}'
  `);

    if (API_REST_NODE_URL === null) {
        pgm.sql(`DELETE FROM projects WHERE title = 'API REST Node.js' AND github_url = '${GENERIC_URL}'`);
    } else {
        pgm.sql(`
      UPDATE projects SET github_url = '${API_REST_NODE_URL}'
      WHERE title = 'API REST Node.js' AND github_url = '${GENERIC_URL}'
    `);
    }
};

exports.down = (pgm) => {
    pgm.sql(`
    UPDATE projects SET github_url = '${GENERIC_URL}'
    WHERE title = 'Dev Portfolio' AND github_url = '${DEV_PORTFOLIO_URL}'
  `);

    if (API_REST_NODE_URL === null) {
        pgm.sql(`
      INSERT INTO projects (title, description, tech_stack, github_url, featured) VALUES
      ('API REST Node.js', 'API RESTful com autenticação JWT e banco de dados PostgreSQL', ARRAY['Node.js', 'Express', 'PostgreSQL', 'JWT'], '${GENERIC_URL}', false)
    `);
    } else {
        pgm.sql(`
      UPDATE projects SET github_url = '${GENERIC_URL}'
      WHERE title = 'API REST Node.js' AND github_url = '${API_REST_NODE_URL}'
    `);
    }
};
