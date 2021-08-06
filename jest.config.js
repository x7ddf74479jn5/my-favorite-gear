require("dotenv").config({ path: "./.env.test" });

module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules)[/\\\\]",
    "<rootDir>[/\\\\](test)[/\\\\].+\\.db\\.test\\.(ts|tsx)$",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  transform: { "^.+\\.(js|ts|tsx)$": "babel-jest" },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mocks__/fileMock.js",
    // "src/(.*)": "<rootDir>/src/$1",
    // "test/(.*)": "<rootDir>/test/$1",
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/src/"],
  testEnvironment: "jsdom",
};
