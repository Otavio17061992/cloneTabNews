exports.up = (pgm) => {
    pgm.addColumns("posts", {
        approved: {
            type: "boolean",
            default: false,
            notNull: true,
        },
    });
    // Aprovar posts antigos para que não sumam na transição
    pgm.sql("UPDATE posts SET approved = true");
};

exports.down = (pgm) => {
    pgm.dropColumns("posts", ["approved"]);
};
