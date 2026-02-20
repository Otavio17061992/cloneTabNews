exports.up = (pgm) => {
    pgm.addColumns("comments", {
        approved: {
            type: "boolean",
            default: false,
            notNull: true,
        },
    });
    // Aprovar comentários antigos para que não sumam na transição
    pgm.sql("UPDATE comments SET approved = true");
};

exports.down = (pgm) => {
    pgm.dropColumns("comments", ["approved"]);
};
