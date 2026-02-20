const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    testEnvironment: "node",
    testPathPattern: "tests/integration",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
};

module.exports = createJestConfig(customJestConfig);
