require("dotenv").config({ path: "./.env.test" });

module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testMatch: ["<rootDir>/test/**/*.db.test.(ts|tsx)"],

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  transform: { "^.+\\.(js|ts|tsx)$": "babel-jest" },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/src/"],
};
