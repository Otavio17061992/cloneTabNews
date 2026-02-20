/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`UPDATE projects SET github_url = REPLACE(github_url, 'joaomesquita', 'Otavio17061992')`);
};

exports.down = (pgm) => {
    pgm.sql(`UPDATE projects SET github_url = REPLACE(github_url, 'Otavio17061992', 'joaomesquita')`);
};
