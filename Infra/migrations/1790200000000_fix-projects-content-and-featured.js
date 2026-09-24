/* eslint-disable camelcase */

exports.shorthands = undefined;

const K8S_URL = "https://github.com/Otavio17061992/KubernetsSimpleApplication";
const FEATURED_URL = "https://github.com/Otavio17061992/SalesWebMVC";

exports.up = (pgm) => {
    // Corrige nome e traduz descrição do projeto Kubernetes
    pgm.sql(`
    UPDATE projects
    SET title = 'Kubernetes Simple Application',
        description = 'Aplicação simples containerizada com Docker e publicada em um cluster Kubernetes, para praticar deploy, services e escalonamento.'
    WHERE github_url = '${K8S_URL}'
  `);

    // Selo "Destaque" apenas no projeto mais relevante
    pgm.sql(`UPDATE projects SET featured = (github_url = '${FEATURED_URL}')`);
};

exports.down = (pgm) => {
    pgm.sql(`
    UPDATE projects
    SET title = 'KubernetsSimpleApplication',
        description = 'A simple application deployed using Kubernetes'
    WHERE github_url = '${K8S_URL}'
  `);

    pgm.sql(`UPDATE projects SET featured = true`);
};
